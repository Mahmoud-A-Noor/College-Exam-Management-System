from rest_framework import serializers
from .models import CustomUser
from rest_framework.authtoken.models import Token

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'date_of_birth': {'read_only': True},
            'gender': {'read_only': True},
            'date_joined': {'read_only': True},
            'is_acttive': {'read_only': True},
            'is_staff': {'read_only': True},
        }


