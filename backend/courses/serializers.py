from rest_framework import serializers
from .models import Course, Enrollment, Exam, ExamQuestion
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

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class ExamQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamQuestion
        fields = ['id', 'exam', 'header', 'isMCQ', 'trueAnswer', 'falseAnswers']

class ExamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Exam
        fields = ['id', 'course', 'is_final', 'exam_datetime', 'num_questions', 'total_degree', 'duration']