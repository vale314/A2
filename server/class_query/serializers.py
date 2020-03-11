from rest_framework import serializers
from class_query.models import FileUpload, Record, Incoherence
from django.conf import settings


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        read_only_fields = ['uploader', 'uploaded_at']
        fields = '__all__'
    
    def create(self, validated_data):
        return FileUpload.objects.create(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['id', 'name', 'email', 'is_staff']


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'


class IncoherenceSerializer(serializers.ModelSerializer):
    records = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Incoherence
        fields = '__all__'
