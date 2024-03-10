import json

from accounts.models import CustomUser
from courses.serializers import CourseSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from courses.models import Course, Request, Exam
from django.db import models
from django.core import serializers
from django.http import JsonResponse
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

class CourseCreateView(APIView):
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

def getStudents(request):
    students = CustomUser.objects.filter(user_type="student")
    students_data = serializers.serialize('json', students)
    students_json = json.loads(students_data)
    return JsonResponse(students_json, safe=False)

def insightsCounts(request):

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
