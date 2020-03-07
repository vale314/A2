from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view
from rest_framework import status

from class_query.models import FileUpload, Record
from class_query.serializers import UserSerializer, FileUploadSerializer, RecordSerializer


class FileUploadList(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, format=None):
        serializer = FileUploadSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save(uploader=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        file_uploads = FileUpload.objects.all()
        serializer = FileUploadSerializer(file_uploads, many=True)
        return Response(serializer.data)


class FileUploadDetail(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        try:
            return FileUpload.objects.get(pk=pk)
        except FileUpload.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        file_upload = self.get_object(pk)
        serializer = FileUploadSerializer(file_upload)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        file_upload = self.get_object(pk)
        file_upload.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def search_records(request):
    """
    Showing all records
    """
    if request.method == 'GET':
        records = Record.objects.all()
        serializer = RecordSerializer(records, many=True)
        return Response(serializer.data)
