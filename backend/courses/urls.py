from django.urls import path
from .views import *

urlpatterns = [
    path('departments/', DepartmentView.as_view(), name='departments-list-retrieve'),
    path('departments/<int:pk>', DepartmentView.as_view(), name='departments-create-update-delete'),

    path('courses/', CourseView.as_view(), name='courses-list-retrieve'),
    path('courses/<int:pk>', CourseView.as_view(), name='courses-create-update-delete'),

]
