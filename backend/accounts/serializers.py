from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['password']
        extra_kwargs = {
            'date_of_birth': {'read_only': True},
            'gender': {'read_only': True},
            'date_joined': {'read_only': True},
            'is_acttive': {'read_only': True},
            'is_staff': {'read_only': True},
        }


