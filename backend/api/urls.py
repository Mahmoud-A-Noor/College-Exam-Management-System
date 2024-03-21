from django.urls import path
from .views import *

urlpatterns = [
    path('student-course-performance/', StudentCoursePerformance.as_view()),
    path('passed-students/', PassedStudents.as_view()),
    path('passed-student-course-ratio/', PassedStudentCourseRatio.as_view()),
    path('lecturer-workload/', LecturerWorkload.as_view()),

    path('exam-completion-rates/', ExamCompletionRatesAPIView.as_view(), name='exam_completion_rates'),
    path('exam-performance-data/', ExamPerformanceDataAPIView.as_view(), name='exam_performance_data'),
    path('student-performance-data/', StudentPerformanceDataAPIView.as_view(), name='student_performance_data'),

    path('courses/', CourseData.as_view(), name='course_data'),
    path('courses/<str:course_name>/', CourseByName.as_view(), name='course_by_name'),
    path('courses/create/', CourseCreate.as_view(), name='course_create'),
    path('courses/<int:pk>/edit/', CourseEdit.as_view(), name='course_edit'),
    path('courses/<int:pk>/delete/', CourseDelete.as_view(), name='course_delete'),

    path('exams/', ExamData.as_view(), name='exam_data'),
    path('exams/<int:exam_id>/', ExamInfoAndQuestions.as_view(), name='exam_and_question_by_id'),
    path('exams/create/', ExamCreate.as_view(), name='exam_create'),
    path('exams/<int:exam_id>/edit/', ExamEdit.as_view(), name='exam_edit'),
    path('exams/<int:pk>/delete/', ExamDelete.as_view(), name='exam_delete'),


    path('get-lecturers-for-select/', getLecturersForSelect, name="get_lecturers_for_select"),
    path('get-lecturers/', getLecturers, name="get_lecturers"),
    path('get-lecturer-courses/', getLecturerCourses, name="get_lecturer_courses"),
    path('get-students/', getStudents, name="get_students"),
    path('admin-insights/', adminInsights, name="admin_insights"),
    path('lecturer-insights/', lecturerInsights, name="lecturer_insights"),
]
