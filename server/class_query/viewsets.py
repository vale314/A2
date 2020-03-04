from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from myapps.serializers import UserSerializer
from rest_framework import viewsets
from rest_framework.response import Response

class AdminViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing admins
    """
    permission_classes = [IsAdminUser]
    queryset = User.objects.filter(is_staff=True)
    tserializer_class = UserSerializer
