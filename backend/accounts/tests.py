from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta
from django.utils import timezone

class CustomUserAPITestCase(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create(
            email='test@dj.dev', password='password123',
            first_name='test', last_name='usr',
            gender='M', user_type='A'
        )
        self.client = APIClient()

    def test_list_users(self):
        response = self.client.get('/account/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_user(self):
        response = self.client.get(f'/account/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@dj.dev')

    def test_create_user(self):
        data = {'email': 'test2@dj.dev', 'password': 'password123',
                'first_name': 'test', 'last_name': 'usr',
                'gender': 'M', 'user_type': 'A'}
        response = self.client.post('/account/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(CustomUser.objects.count(), 2)

