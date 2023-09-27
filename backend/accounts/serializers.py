from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [  'email', 'password', 'first_name', 'last_name', 'gender', 'user_type',
                    'address', 'phone_number', 'date_of_birth', 'img',
                ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = make_password(password)
        user = CustomUser.objects.create(password=hashed_password, **validated_data)
        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [  'id', 'email', 'first_name', 'last_name',
                    'address', 'phone_number', 'date_of_birth', 'img',
                ]


