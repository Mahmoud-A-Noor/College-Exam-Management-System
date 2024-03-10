from django.urls import path
from .views import *

urlpatterns = [

    path('courses/', CourseView.as_view()),
    path('courses/<int:pk>', CourseView.as_view()),

    path('requests/', RequestListCreateView.as_view()),
    path('requests/<int:pk>', RequestListCreateView.as_view()),
    

]
