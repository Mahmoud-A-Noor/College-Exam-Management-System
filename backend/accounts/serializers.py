from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [  'email', 'password', 'first_name', 'last_name', 'gender', 'user_type',
                    'address', 'phone_number', 'date_of_birth', 'img',
                ]
        extra_kwargs = {
            'password': {'write_only': True},
        }


