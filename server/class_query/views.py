from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status

from class_query.models import FileUpload
from class_query.serializers import UserSerializer, FileUploadSerializer


class FileUploadList(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        serializer = FileUploadSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        file_uploads = FileUpload.objects.all()
        serializer = FileUploadSerializer(file_uploads, many=True)
        return Response(serializer.data)
