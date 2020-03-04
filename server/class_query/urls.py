from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from class_query import viewsets

admin_list = viewsets.AdminViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

admin_detail = SnippetViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('admin/', admin_list, name='admin-list'),
    path('admin/<int:pk>/', admin_detail, name='admin-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
