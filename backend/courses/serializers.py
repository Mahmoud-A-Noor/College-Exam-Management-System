from rest_framework import serializers
from .models import Course, Request
from django.urls import reverse


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

    def get_edit_url(self, obj):
        return reverse('course_edit', kwargs={'pk': obj.pk})

    def get_delete_url(self, obj):
        return reverse('course_delete', kwargs={'pk': obj.pk})
    
    def create(self, validated_data):
        return Course.objects.create(**validated_data)

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = '__all__'