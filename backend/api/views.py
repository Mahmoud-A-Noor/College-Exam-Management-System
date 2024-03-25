import json
from datetime import datetime
from datetime import date

from accounts.models import CustomUser
from courses.serializers import CourseSerializer, ExamSerializer, ExamQuestionSerializer
from courses.models import Course, Enrollment, Exam, ExamAttempt, ExamQuestion, Enrollment

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.db import models
from django.db.models import Count, Avg
from django.core import serializers
from django.http import JsonResponse
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view


class StudentCoursePerformance(APIView):
    def get(self, request):
        courses = Course.objects.all()[:7]  # Assuming you want data for the first 8 courses
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
        years = [1, 2, 3, 4]
        years_written = ['1st Year', '2nd Year', '3rd Year', '4th Year']
        passed_counts = [Enrollment.objects.filter(status=3, course__year=year).count() for year in years]
        failed_counts = [Enrollment.objects.filter(status=2, course__year=year).count() for year in years]
        data = {
            'labels': years_written,
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
        courses = Course.objects.all()[:7]  # Assuming you want data for the first 5 courses
        
        data = {
            'labels': [course.name for course in courses],
            'datasets': [
                {
                    'label': 'Passed Student/Course Ratio',
                    'data': [
                        Enrollment.objects.filter(course=course, score__gte=course.final_percentage).count() / course.students.count() if course.students.count() > 0 else 0
                        for course in courses
                    ],
                }
            ]
        }
        return Response(data)

class LecturerWorkload(APIView):
    def get(self, request):
        lecturers = get_user_model().objects.filter(user_type="lecturer")
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

class ExamCompletionRates(APIView):
    def get(self, request):
        exams = Exam.objects.annotate(num_attempts=Count('examattempt'))
        completion_rates = []
        for exam in exams:
            if exam.course.enrollments.count() != 0:
                completion_rate = (exam.course.name, (exam.num_attempts / exam.course.enrollments.count()) * 100)
                completion_rates.append(completion_rate)
            else:
                completion_rates.append((exam.course.name, 0))  # Set completion rate to 0 if there are no students
        return Response(completion_rates)

class ExamPerformanceData(APIView):
    def get(self, request):
        exams = Exam.objects.all()
        performance_data = [(exam.course.name, exam.examattempt_set.aggregate(Avg('score'))['score__avg']) for exam in exams]
        return Response(performance_data)

class StudentPerformanceData(APIView):
    def get(self, request):
        performance_data = ExamAttempt.objects.values_list('score', flat=True)
        excellent = len([score for score in performance_data if score >= 90])
        very_good = len([score for score in performance_data if 80 <= score < 90])
        good = len([score for score in performance_data if 70 <= score < 80])
        average = len([score for score in performance_data if 60 <= score < 70])
        below_average = len([score for score in performance_data if score < 60])
        return Response({'excellent': excellent, 'very_good': very_good, 'good': good, 'average': average, 'below_average': below_average})

class SubjectPerformance(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')  
        
        user = get_object_or_404(CustomUser, id=user_id)
        
        current_year = user.year
        
        enrollments = Enrollment.objects.filter(user_id=user_id, course__year=current_year)
        
        average_scores = enrollments.values('course').annotate(average_score=Avg('score'))
        
        labels = []
        student_scores = []
        average_scores_data = []
        
        for entry in average_scores:
            course_name = Course.objects.get(id=entry['course']).name
            labels.append(course_name)
            average_scores_data.append(entry['average_score'])
            student_score = enrollments.filter(course_id=entry['course']).first().score
            student_scores.append(student_score)
        
        subject_performance_data = {
            'labels': labels,
            'datasets': [
                {
                    'label': 'Your Scores',
                    'data': student_scores,
                    'backgroundColor': 'rgba(75, 192, 192, 0.6)',
                },
                {
                    'label': 'Average Scores',
                    'data': average_scores_data,
                    'backgroundColor': 'rgba(255, 99, 132, 0.6)',
                },
            ],
        }
        
        return Response(subject_performance_data)

class GPAProgress(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')
        
        user = get_object_or_404(CustomUser, id=user_id)
        
        gpa_data = {
            'labels': ['1st Year', '2nd Year', '3rd Year', '4th Year'],
            'datasets': [
                {
                    'fill': True,
                    'label': 'Student GPA',
                    'data': [], 
                }
            ]
        }

        cumulative_gpa = 0

        for year in range(1, 5):
            if year > user.year:
                gpa_data['datasets'][0]['data'].append(None)  # Add null for years beyond current year
                continue
            
            enrollments = Enrollment.objects.filter(user_id=user_id, course__year=year)
            total_score = sum(enrollment.score if enrollment.score else 0 for enrollment in enrollments)
            total_courses = len(enrollments)
            if total_courses == 0:
                year_gpa = 0
            else:
                year_gpa = cumulative_gpa + (total_score / total_courses)
            
            cumulative_gpa = year_gpa

            gpa_data['datasets'][0]['data'].append(year_gpa)

        return Response(gpa_data)

class StudentTranscript(APIView):
    def get(self, request):
        user_id = request.query_params.get('user_id')
        
        student = get_object_or_404(CustomUser, id=user_id)
        student_info = {
            'name': f"{student.first_name} {student.last_name}",
            'id': student.student_id,
            'gpa': 0,  # Initialize GPA
            'appreciation': ""  # Initialize appreciation
        }
        
        enrollments = Enrollment.objects.filter(user_id=user_id)
        total_score = 0
        total_weight = 0
        for enrollment in enrollments:
            total_score += enrollment.score if enrollment.score else 0
            total_weight += 100  # Assuming maximum score is 100
        
        if total_weight > 0:
            student_info['gpa'] = total_score / total_weight
        
        if student_info['gpa'] >= 3.8:
            student_info['appreciation'] = "Excellent"
        elif student_info['gpa'] >= 3.5:
            student_info['appreciation'] = "Very Good"
        elif student_info['gpa'] >= 3.0:
            student_info['appreciation'] = "Good"
        else:
            student_info['appreciation'] = "Needs Improvement"

        student_courses = {}
        for enrollment in enrollments:
            year = f"{enrollment.course.year}st year"
            if year not in student_courses:
                student_courses[year] = []
            student_courses[year].append({
                "courseName": enrollment.course.name,
                "score": enrollment.score,
                "status": enrollment.status
            })

        student_transcript_data = {
            "studentInfo": student_info,
            "data": [{"year": year, "courses": courses} for year, courses in student_courses.items()]
        }

        return Response(student_transcript_data)



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
    def post(self, request):
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
        
    def put(self, request):
        pass

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
        lecturer_user = get_object_or_404(get_user_model(), pk=lecturer_id)

        exams = Exam.objects.filter(course__lecturer=lecturer_user)

        serialized_data = []
        for exam in exams:
            exam_data = ExamSerializer(exam).data
            exam_data['actions'] = {
                'edit': f'/api/exams/{exam_data["id"]}/edit/',
                'delete': f'/api/exams/{exam_data["id"]}/delete/'
            }
            exam_data['course_name'] = exam.course.name
            exam_data['exam_date'] = exam.exam_datetime.date()
            exam_data['exam_time'] = exam.exam_datetime.time()
            serialized_data.append(exam_data)

        return Response(serialized_data)

class ExamInfoAndQuestions(APIView):
    def get(self, request, exam_id):
        try:
            exam = Exam.objects.get(id=exam_id)

            exam_questions = ExamQuestion.objects.filter(exam=exam)

            serializer = ExamQuestionSerializer(exam_questions, many=True)

            exam_related_info = {
                "courseName": exam.course.name,
                "isFinal": exam.is_final,
                "examDateTime": exam.exam_datetime.isoformat(),
                "numQuestions": exam.num_questions,
                "totalDegree": exam.total_degree,
                "duration": exam.duration
            }

            response_data = {
                "examRelatedInfo": exam_related_info,
                "examQuestions": serializer.data
            }

            return Response(response_data)
        except Exam.DoesNotExist:
            return Response({"error": "Exam not found"}, status=404)

class TodayExams(APIView):
    def get(self, request):
        user_id = request.query_params.get('student_id')

        today = date.today()

        enrolled_courses = Enrollment.objects.filter(user_id=user_id).values_list('course_id', flat=True)

        exams = Exam.objects.filter(course_id__in=enrolled_courses, exam_datetime__date=today)

        serialized_exams = []
        for exam in exams:
            exam_attempt_exists = ExamAttempt.objects.filter(exam=exam, student_id=user_id).exists()

            serialized_exams.append({
                'exam_id': exam.id,
                'exam_date': exam.exam_datetime.date(),
                'exam_time': exam.exam_datetime.time(),
                'course_name': exam.course.name,
                'is_final': exam.is_final,
                "number_of_questions": exam.num_questions,
                "duration": exam.duration,
                "total_degree": exam.total_degree,
                "exam_attempt_exists": exam_attempt_exists  # Indicates if there is an attempt for this exam
            })

        return Response(serialized_exams)

class ExamCreate(APIView):
    def post(self, request):
        exam_data = request.data.get('examRelatedInfo', {})
        exam_questions = request.data.get('examQuestions', [])

        exam_data["course"] = Course.objects.get(name=exam_data["course"]).pk
        exam_data["duration"] = int(exam_data["duration"])
        exam_data["num_questions"] = int(exam_data["num_questions"])
        exam_data["total_degree"] = int(exam_data["total_degree"])
        exam_data["exam_datetime"] = datetime.strptime(exam_data["exam_datetime"], '%Y-%m-%dT%H:%M:%S.%fZ')


        serializer = ExamSerializer(data=exam_data)
        if serializer.is_valid():
            exam = serializer.save()

            for question_data in exam_questions:
                question_data['exam'] = exam.id
                
                question_serializer = ExamQuestionSerializer(data=question_data)
                if question_serializer.is_valid():
                    question_serializer.save()
                else:
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
                    exam.questions.create(**question_data)

            exam.questions.exclude(id__in=[q['id'] for q in exam_questions if 'id' in q]).delete()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExamDelete(APIView):
    def delete(self, request, pk):
        exam = get_object_or_404(Exam, pk=pk)

        exam.questions.all().delete()

        exam.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class StartExamAttempt(APIView):
    def post(self, request, exam_id):
        exam = get_object_or_404(Exam, pk=exam_id)
        
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        exam_attempt, created = ExamAttempt.objects.get_or_create(exam=exam, student_id=user_id, defaults={'start_time': timezone.now()})

        return Response({'message': 'Exam attempt started successfully', 'exam_attempt_id': exam_attempt.id}, status=status.HTTP_201_CREATED)

class SubmitAnswers(APIView):
    def post(self, request):
        exam_attempt_id = request.data.get('exam_attempt_id')
        student_id = request.data.get('student_id')
        student_answers = request.data.get('student_answers')

        if not (exam_attempt_id and student_id and student_answers):
            return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

        exam_attempt = get_object_or_404(ExamAttempt, pk=exam_attempt_id)

        questions = exam_attempt.exam.questions.all()

        total_questions = len(questions)
        correct_answers = 0
        for answer in student_answers:
            question_id = answer.get('question_id')
            student_answer = answer.get('answer')

            question = get_object_or_404(ExamQuestion, pk=question_id)

            if question.trueAnswer == student_answer:
                correct_answers += 1

        score_percentage = (correct_answers / total_questions) * 100

        exam_attempt.score = score_percentage
        exam_attempt.save()

        exam = exam_attempt.exam
        if exam.is_final:
            course = exam_attempt.exam.course
            final_percentage = course.final_percentage
            final_exam_score = score_percentage * (final_percentage / 100)  # Score of the final exam
            other_exams_score = (100 - final_percentage) / 100  # Weightage of other exams (30% in this case)

            other_exam_attempts = ExamAttempt.objects.filter(exam__course=course, student_id=student_id, id__ne=exam_attempt_id)
            total_other_exams_score = sum(attempt.score for attempt in other_exam_attempts)  # Total score of other exams

            overall_score = final_exam_score + (other_exams_score * total_other_exams_score)

            enrollment = Enrollment.objects.get(course=course, user_id=student_id)
            enrollment.score = overall_score
            if overall_score >= 50:
                enrollment.status = 3
            else:
                enrollment.status = 2
            enrollment.save()

        return Response({'message': 'Score calculated and updated successfully'}, status=status.HTTP_200_OK)




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
        lecturer = get_object_or_404(get_user_model(), pk=lecturer_id)

        courses = Course.objects.filter(lecturer=lecturer)

        serialized_courses = [{'name': course.name, 'content': course.content, 'final_percentage': course.final_percentage, 'is_active': course.is_active, 'created_at': course.created_at, 'year': course.year} for course in courses]

        return JsonResponse(serialized_courses, status=200, safe=False)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

def getStudents(request):
    students = CustomUser.objects.filter(user_type="student")
    students_data = serializers.serialize('json', students)
    students_json = json.loads(students_data)
    return JsonResponse(students_json, safe=False)

def getStudentCourses(request):
    if request.method == 'GET':
        student_id = request.GET.get('student_id')
        if student_id is None:
            return JsonResponse({'error': 'student_id parameter is required'}, status=400)

        student = get_object_or_404(get_user_model(), pk=student_id)

        enrolled_courses = student.enrollments.values_list('course_id', flat=True)
        courses = Course.objects.filter(is_active=True, year=student.year).exclude(id__in=enrolled_courses)

        serialized_courses = [{'name': course.name, 'content': course.content, 'final_percentage': course.final_percentage, 'year': course.year, 'lecturer': f"{course.lecturer.first_name} {course.lecturer.last_name}"} for course in courses]

        return JsonResponse(serialized_courses, status=200, safe=False)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
    



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
        lecturer = get_object_or_404(get_user_model(), pk=lecturer_id)

        enrollment_requests_count = Enrollment.objects.filter(course__lecturer=lecturer).count()

        exams_count = Exam.objects.filter(course__lecturer=lecturer).count()

        successful_students_count = Enrollment.objects.filter(course__lecturer=lecturer, score__gte=50).count()

        failed_students_count = Enrollment.objects.filter(course__lecturer=lecturer, status=2).exclude(score__gte=50).count()

        response_data = {
            'enrollment_requests_count': enrollment_requests_count,
            'exams_count': exams_count,
            'successful_students_count': successful_students_count,
            'failed_students_count': failed_students_count,
        }

        return JsonResponse(response_data, status=200)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

def studentInsights(request):
    if request.method == 'GET':

        student_id = request.GET.get('student_id')
        if student_id is None:
            return JsonResponse({'error': 'lecturer_id parameter is required'}, status=400)
        
        user = get_object_or_404(CustomUser, id=student_id)
        current_year = user.year

        enrolled_courses = Enrollment.objects.filter(user_id=student_id, course__year=current_year)

        enrolled_courses_data = []
        for enrollment in enrolled_courses:
            if enrollment.score is None:
                exam_attempts = ExamAttempt.objects.filter(student_id=student_id, exam__course=enrollment.course)
                total_score = 0
                for attempt in exam_attempts:
                    if(attempt.score == None):
                        attempt.score = 0
                        attempt.save()
                total_score = attempt.score + total_score
                score = total_score / len(exam_attempts) if exam_attempts else None
            else:
                score = enrollment.score

            enrolled_courses_data.append({
                'courseName': enrollment.course.name,
                'score': score
            })

        return JsonResponse(enrolled_courses_data, safe=False)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@api_view(['POST'])
def enroll_courses(request):
    course_names = request.data.get('course_names', [])

    user_id = request.data.get('user_id')
    User = get_user_model()
    user = get_object_or_404(User, id=user_id)

    for course_name in course_names:
        course, created = Course.objects.get_or_create(name=course_name)

        enrollment, created = Enrollment.objects.get_or_create(user=user, course=course, status=1)

    return Response({"message": "Courses enrolled successfully."})
