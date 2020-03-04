from rest_framework import serializers
from class_query.models import FileUpload
from django.contrib.auth.models import User


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_staff']
