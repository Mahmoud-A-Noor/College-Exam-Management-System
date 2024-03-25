from django.urls import path
from .views import *

urlpatterns = [
    path('student-course-performance/', StudentCoursePerformance.as_view()),
    path('passed-students/', PassedStudents.as_view()),
    path('passed-student-course-ratio/', PassedStudentCourseRatio.as_view()),
    path('lecturer-workload/', LecturerWorkload.as_view()),

    path('exam-completion-rates/', ExamCompletionRates.as_view(), name='exam_completion_rates'),
    path('exam-performance-data/', ExamPerformanceData.as_view(), name='exam_performance_data'),
    path('student-performance-data/', StudentPerformanceData.as_view(), name='student_performance_data'),

    path('subject-performance-data/', SubjectPerformance.as_view(), name='subject_performance_data'),
    path('gpa-progress/', GPAProgress.as_view(), name='gpa-progress'),
    path('student-transcript/', StudentTranscript.as_view(), name='student-transcript'),
    
    path('courses/', CourseData.as_view(), name='course_data'),
    path('courses/create/', CourseCreate.as_view(), name='course_create'),
    path('courses/<str:course_name>/', CourseByName.as_view(), name='course_by_name'),
    path('courses/<int:pk>/edit/', CourseEdit.as_view(), name='course_edit'),
    path('courses/<int:pk>/delete/', CourseDelete.as_view(), name='course_delete'),

    path('exams/', ExamData.as_view(), name='exam_data'),
    path('exams/create/', ExamCreate.as_view(), name='exam_create'),
    path('exams/today-exams/', TodayExams.as_view(), name='today_exams'),
    path('exams/submit-answers/', SubmitAnswers.as_view(), name='submit_answers'),
    path('exams/<int:exam_id>/', ExamInfoAndQuestions.as_view(), name='exam_and_question_by_id'),
    path('exams/<int:pk>/delete/', ExamDelete.as_view(), name='exam_delete'),
    path('exams/<int:exam_id>/edit/', ExamEdit.as_view(), name='exam_edit'),
    path('exam-attempt/<int:exam_id>/start/', StartExamAttempt.as_view(), name='start_exam_attempt'),


    path('get-lecturers-for-select/', getLecturersForSelect, name="get_lecturers_for_select"),
    path('get-lecturers/', getLecturers, name="get_lecturers"),
    path('get-lecturer-courses/', getLecturerCourses, name="get_lecturer_courses"),
    path('get-students/', getStudents, name="get_students"),
    path('get-student-courses/', getStudentCourses, name="get_student_courses"),
    path('admin-insights/', adminInsights, name="admin_insights"),
    path('lecturer-insights/', lecturerInsights, name="lecturer_insights"),
    path('student-insights/', studentInsights, name="student_insights"),

    path('enroll-courses/', enroll_courses, name="enroll_courses"),
]
