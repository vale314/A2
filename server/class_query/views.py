from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view
from rest_framework import status

from class_query.models import *
from class_query.serializers import *


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

@api_view(['POST'])
def upload_records(request):
    records = request.POST['records']

    if len(records) == 0:
        return Response(status=status.HTTP_204_NO_CONTENT)

    for record in json.loads(records):
        try:
            Record.create(record)
        except:
            return Response(status=status.HTTP_500)
    return Response(status=status.HTTP_201_CREATED)

@api_view(['GET'])
def show_collisions(request):
    collisions = Incoherence.objects.filter(incoherent_fields='collision')
    serializer = IncoherenceSerializer(collisions, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def search_records(request):
    """
    Showing all records
    """
    if request.method == 'GET':
        records = Record.objects.all()
        serializer = RecordSerializer(records, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def list_admins(request):
    records = User.objects.filter(is_staff=True)
    serializer = UserSerializer(records, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def list_users(request):
    records = User.objects.filter(is_staff=False)
    serializer = UserSerializer(records, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def show_current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    user = User()
    user_form_data = request.POST
    if (user_form_data.is_valid()):
        user.username = user_form_data['name']
        user.email = user_form_data['email']
        user.password = user_form_data['password']
        try:
            user.save()
            return Response(status=status.HTTP_201_CREATED)
        except:
            return JsonResponse({'msg': "Datos de identificación ya usados por otro usuario"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return JsonResponse({'msg': "Datos de identificación inválidos"}, status=status.HTTP_400_NOT_ACCEPTABLE)
