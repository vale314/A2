from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from class_query.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

class AdminViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing admins
    """
    permission_classes = [IsAdminUser]
    queryset = User.objects.filter(is_staff=True)
    serializer_class = UserSerializer
