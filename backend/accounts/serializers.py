from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['password']
        extra_kwargs = {
            'date_of_birth': {'read_only': True},
            'gender': {'read_only': True},
            'user_type': {'read_only': True},
            'date_joined': {'read_only': True},
            'is_active': {'read_only': True},
            'is_superuser': {'read_only': True},
            'is_staff': {'read_only': True},
            'last_login': {'read_only': True},
            'groups': {'read_only': True},
            'user_permissions': {'read_only': True},
        }


