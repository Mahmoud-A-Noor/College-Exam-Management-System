from django.urls import path
from .views import *

urlpatterns = [

    path('courses/', CourseView.as_view()),
    path('courses/<int:pk>', CourseView.as_view()),

    path('requests/', EnrollmentListCreateView.as_view()),
    path('requests/<int:pk>', EnrollmentListCreateView.as_view()),
    

]
