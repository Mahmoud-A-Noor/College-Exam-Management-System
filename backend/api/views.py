import json
from datetime import datetime

from accounts.models import CustomUser
from courses.serializers import CourseSerializer, ExamSerializer, ExamQuestionSerializer
from courses.models import Course, Request, Exam, ExamAttempt, ExamQuestion

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.db import models
from django.db.models import Count, Avg
from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model



class StudentCoursePerformance(APIView):
    def get(self, request):
        courses = Course.objects.all()[:8]  # Assuming you want data for the first 8 courses
        data = {
            'labels': [course.name for course in courses],
            'datasets': [
                {
                    'label': 'Average Students scores Per Course',
                    'data': [course.students.aggregate(models.Avg('score'))['score__avg'] or 0 for course in courses],
                },
            ],
        }
        return Response(data)

class PassedStudents(APIView):
    def get(self, request):
        semesters = ['1st Semester', '2nd Semester']
        passed_counts = [Request.objects.filter(course__is_active=True).count() for semester in semesters]
        failed_counts = [Request.objects.filter(course__is_active=True).count() for semester in semesters]
        data = {
            'labels': semesters,
            'datasets': [
                {
                    'fill': True,
                    'label': 'Passed Students',
                    'data': passed_counts,
                },
                {
                    'fill': True,
                    'label': 'Failed Students',
                    'data': failed_counts,
                },
            ]
        }
        return Response(data)

class PassedStudentCourseRatio(APIView):
    def get(self, request):
        courses = Course.objects.all()[:5]  # Assuming you want data for the first 5 courses
        
        data = {
            'labels': [course.name for course in courses],
            'datasets': [
                {
                    'label': 'Passed Student/Course Ratio',
                    'data': [
                        Request.objects.filter(course=course, score__gte=course.final_percentage).count() / course.students.count() if course.students.count() > 0 else 0
                        for course in courses
                    ],
                }
            ]
        }
        return Response(data)

class LecturerWorkload(APIView):
    def get(self, request):
        lecturers = get_user_model().objects.filter(user_type="lecturer")  # Assuming lecturers are staff users
        data = {
            'labels': [f"{lecturer.first_name} {lecturer.last_name}" for lecturer in lecturers],
            'datasets': [
                {
                    'label': 'Number of Exams Per Lecturer',
                    'data': [lecturer.courses_taught.count() for lecturer in lecturers],
                },
            ],
        }
        return Response(data)

class ExamCompletionRatesAPIView(APIView):
    def get(self, request):
        exams = Exam.objects.annotate(num_attempts=Count('examattempt'))
        completion_rates = []
        for exam in exams:
            if exam.course.students.count() != 0:
                completion_rate = (exam.course.name, (exam.num_attempts / exam.course.students.count()) * 100)
                completion_rates.append(completion_rate)
            else:
                completion_rates.append((exam.course.name, 0))  # Set completion rate to 0 if there are no students
        return Response(completion_rates)

class ExamPerformanceDataAPIView(APIView):
    def get(self, request):
        exams = Exam.objects.all()
        performance_data = [(exam.course.name, exam.examattempt_set.aggregate(Avg('score'))['score__avg']) for exam in exams]
        return Response(performance_data)

class StudentPerformanceDataAPIView(APIView):
    def get(self, request):
        performance_data = ExamAttempt.objects.values_list('score', flat=True)
        excellent = len([score for score in performance_data if score >= 90])
        very_good = len([score for score in performance_data if 80 <= score < 90])
        good = len([score for score in performance_data if 70 <= score < 80])
        average = len([score for score in performance_data if 60 <= score < 70])
        below_average = len([score for score in performance_data if score < 60])
        return Response({'excellent': excellent, 'very_good': very_good, 'good': good, 'average': average, 'below_average': below_average})



class CourseData(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serialized_data = CourseSerializer(courses, many=True).data
        for course_data in serialized_data:
            course_data['actions'] = {
                'edit': f'/api/courses/{course_data["id"]}/edit/',
                'delete': f'/api/courses/{course_data["id"]}/delete/'
            }
            user = CustomUser.objects.get(pk=course_data["lecturer"])
            course_data['lecturer_full_name'] = f"{user.first_name} {user.last_name}"
        return Response(serialized_data)

class CourseByName(APIView):
    def get(self, request, course_name):
        try:
            course = Course.objects.get(name=course_name)
        except Course.DoesNotExist:
            return JsonResponse({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(course)

        return JsonResponse(serializer.data, status=status.HTTP_200_OK)

class CourseCreate(APIView):
    def post(self, request, format=None):
        course_name = request.data.get('name')
        if Course.objects.filter(name=course_name).exists():
            error_message = f"A course with the name '{course_name}' already exists."
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class CourseEdit(APIView):
    def put(self, request, pk):
        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseDelete(APIView):
    def delete(self, request, pk):
        try:
            course = Course.objects.get(pk=pk)
        except Course.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExamData(APIView):
    def get(self, request):

        lecturer_id = request.GET.get('lecturer_id')
        # Get the user associated with the lecturer ID
        lecturer_user = get_object_or_404(get_user_model(), pk=lecturer_id)

        # Filter exams by the lecturer's courses
        exams = Exam.objects.filter(course__lecturer=lecturer_user)

        serialized_data = []
        for exam in exams:
            exam_data = ExamSerializer(exam).data
            exam_data['actions'] = {
                'edit': f'/api/exams/{exam_data["id"]}/edit/',
                'delete': f'/api/exams/{exam_data["id"]}/delete/'
            }
            # Retrieve course name
            exam_data['course_name'] = exam.course.name
            exam_data['exam_date'] = exam.exam_datetime.date()
            exam_data['exam_time'] = exam.exam_datetime.time()
            serialized_data.append(exam_data)

        return Response(serialized_data)

class ExamInfoAndQuestions(APIView):
    def get(self, request, exam_id):
        try:
            # Get the exam object
            exam = Exam.objects.get(id=exam_id)

            # Get all exam questions related to the exam
            exam_questions = ExamQuestion.objects.filter(exam=exam)

            # Serialize the exam questions data
            serializer = ExamQuestionSerializer(exam_questions, many=True)

            # Construct the examRelatedInfo data
            exam_related_info = {
                "courseName": exam.course.name,
                "isFinal": exam.is_final,
                "examDateTime": exam.exam_datetime.isoformat(),
                "numQuestions": exam.num_questions,
                "totalDegree": exam.total_degree,
                "duration": exam.duration
            }

            # Construct the response data
            response_data = {
                "examRelatedInfo": exam_related_info,
                "examQuestions": serializer.data
            }

            return Response(response_data)
        except Exam.DoesNotExist:
            return Response({"error": "Exam not found"}, status=404)

class ExamCreate(APIView):
    def post(self, request):
        # Get exam related information from the request data
        exam_data = request.data.get('examRelatedInfo', {})
        exam_questions = request.data.get('examQuestions', [])

        exam_data["course"] = Course.objects.get(name=exam_data["course"]).pk
        exam_data["duration"] = int(exam_data["duration"])
        exam_data["num_questions"] = int(exam_data["num_questions"])
        exam_data["total_degree"] = int(exam_data["total_degree"])
        exam_data["exam_datetime"] = datetime.strptime(exam_data["exam_datetime"], '%Y-%m-%dT%H:%M:%S.%fZ')


        # Create the exam object
        serializer = ExamSerializer(data=exam_data)
        if serializer.is_valid():
            exam = serializer.save()

            # Create exam questions
            for question_data in exam_questions:
                # Add exam reference to question data
                question_data['exam'] = exam.id
                
                # Create and save the question object
                question_serializer = ExamQuestionSerializer(data=question_data)
                if question_serializer.is_valid():
                    question_serializer.save()
                else:
                    # If question data is invalid, return error response
                    exam.delete()  # Delete exam if any question creation fails
                    return Response(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExamEdit(APIView):
    def put(self, request, exam_id):
        exam = get_object_or_404(Exam, pk=exam_id)

        exam_data_ = request.data.get('examRelatedInfo', {})
        exam_questions = request.data.get('examQuestions', [])
        exam_data = {}
        exam_data["course"] = Course.objects.get(name=exam_data_["courseName"]).pk
        exam_data["is_final"] = bool(exam_data_["isFinal"])
        exam_data["duration"] = int(exam_data_["duration"])
        exam_data["num_questions"] = int(exam_data_["numQuestions"])
        exam_data["total_degree"] = int(exam_data_["totalDegree"])
        exam_data["exam_datetime"] = datetime.strptime(exam_data_["examDateTime"], '%Y-%m-%dT%H:%M:%S.%fZ')

        serializer = ExamSerializer(instance=exam, data=exam_data)
        if serializer.is_valid():
            serializer.save()

                # Update existing questions if necessary
            for question_data in exam_questions:
                question_id = question_data.get('id')
                if question_id:
                    question = exam.questions.filter(id=question_id).first()
                    if question:
                        question.header = question_data.get('header', question.header)
                        question.isMCQ = question_data.get('isMCQ', question.isMCQ)
                        question.trueAnswer = question_data.get('trueAnswer', question.trueAnswer)
                        question.falseAnswers = question_data.get('falseAnswers', question.falseAnswers)
                        question.save()
                else:
                    # Create new question
                    exam.questions.create(**question_data)

            # Delete questions not included in the request
            exam.questions.exclude(id__in=[q['id'] for q in exam_questions if 'id' in q]).delete()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExamDelete(APIView):
    def delete(self, request, pk):
        exam = get_object_or_404(Exam, pk=pk)

        # Delete associated questions
        exam.questions.all().delete()

        exam.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def getLecturersForSelect(request):
    lecturers = CustomUser.objects.filter(user_type="lecturer")
    lecturers_list = [
        {
            'id': lecturer.id,
            'name': f"{lecturer.first_name} {lecturer.last_name}",
        }
        for lecturer in lecturers
    ]
    return JsonResponse(lecturers_list, safe=False)

def getLecturers(request):
    lecturers = CustomUser.objects.filter(user_type="lecturer")
    lecturers_data = serializers.serialize('json', lecturers)
    lecturers_json = json.loads(lecturers_data)
    return JsonResponse(lecturers_json, safe=False)

def getLecturerCourses(request):
    if request.method == 'GET':
        
        lecturer_id = request.GET.get('lecturer_id')
        if lecturer_id is None:
            return JsonResponse({'error': 'lecturer_id parameter is required'}, status=400)
        # Get the lecturer user object based on the provided lecturer_id
        lecturer = get_object_or_404(get_user_model(), pk=lecturer_id)

        # Retrieve the courses taught by the lecturer
        courses = Course.objects.filter(lecturer=lecturer)

        # Serialize the courses data
        serialized_courses = [{'name': course.name, 'content': course.content, 'final_percentage': course.final_percentage, 'is_active': course.is_active, 'created_at': course.created_at} for course in courses]

        # Return the serialized data as JSON
        return JsonResponse(serialized_courses, status=200, safe=False)

    # Handle unsupported request methods
    return JsonResponse({'error': 'Method not allowed'}, status=405)

def getStudents(request):
    students = CustomUser.objects.filter(user_type="student")
    students_data = serializers.serialize('json', students)
    students_json = json.loads(students_data)
    return JsonResponse(students_json, safe=False)


def adminInsights(request):
    students_count = CustomUser.objects.filter(user_type="student").count()
    lecturers_count = CustomUser.objects.filter(user_type="lecturer").count()
    courses_count = Course.objects.count()
    exams_count = Exam.objects.count()

    insights = {
        "students_count": students_count,
        "lecturers_count": lecturers_count,
        "courses_count": courses_count,
        "exams_count": exams_count
    }

    return JsonResponse(insights)

def lecturerInsights(request):
    if request.method == 'GET':

        lecturer_id = request.GET.get('lecturer_id')
        if lecturer_id is None:
            return JsonResponse({'error': 'lecturer_id parameter is required'}, status=400)
        # Get the lecturer user object based on the authenticated user or any other identifier
        lecturer = get_object_or_404(get_user_model(), pk=lecturer_id)

        # Number of students that request to enroll in courses taught by this lecturer
        enrollment_requests_count = Request.objects.filter(course__lecturer=lecturer).count()

        # Number of exams created by this lecturer
        exams_count = Exam.objects.filter(course__lecturer=lecturer).count()

        # Number of successful students in courses taught by this lecturer
        successful_students_count = Request.objects.filter(course__lecturer=lecturer, score__gte=50).count()

        # Number of failed students in courses taught by this lecturer
        failed_students_count = Request.objects.filter(course__lecturer=lecturer).exclude(score__gte=50).count()

        # Prepare the response data
        response_data = {
            'enrollment_requests_count': enrollment_requests_count,
            'exams_count': exams_count,
            'successful_students_count': successful_students_count,
            'failed_students_count': failed_students_count,
        }

        # Return the response as JSON
        return JsonResponse(response_data, status=200)

    # Handle unsupported request methods
    return JsonResponse({'error': 'Method not allowed'}, status=405)



