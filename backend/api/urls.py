from django.urls import path
from .views import *

urlpatterns = [
    path('student-course-performance/', StudentCoursePerformance.as_view()),
    path('passed-students/', PassedStudents.as_view()),
    path('passed-student-course-ratio/', PassedStudentCourseRatio.as_view()),
    path('lecturer-workload/', LecturerWorkload.as_view()),

    path('courses/', CourseData.as_view(), name='course_data'),
    path('courses/create/', CourseCreateView.as_view(), name='course_create'),
    path('courses/<int:pk>/edit/', CourseEdit.as_view(), name='course_edit'),
    path('courses/<int:pk>/delete/', CourseDelete.as_view(), name='course_delete'),

    path('get-lecturers-for-select/', getLecturersForSelect, name="get_lecturers_for_select"),
    path('get-lecturers/', getLecturers, name="get_lecturers"),
    path('get-students/', getStudents, name="get_students"),
    path('insights-counts/', insightsCounts, name="insights_counts"),
]
