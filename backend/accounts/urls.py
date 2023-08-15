from django.urls import path
from .views import *

urlpatterns = [
    path('', UserListView.as_view(), name='users-list'),
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('<int:pk>/', UserRetrieveDeleteView.as_view(), name='user-detail'),
    path('update/', update_user, name="update"),
    path('login/', login_view, name="auth-token"),
    path('token/refresh', refresh_token, name="auth-token"),
]
