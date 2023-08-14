from django.urls import path
from .views import *

urlpatterns = [
    path('', UserListView.as_view(), name='users-list'),
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('<int:pk>/', UserRetrieveUpdateDeleteView.as_view(), name='user-detail'),
    path('login/', login_view, name="auth-token"),
]
