from rest_framework import serializers
from class_query.models import FileUpload, Record
from django.contrib.auth.models import User


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        read_only_fields = ['uploader']
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_staff']

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'
