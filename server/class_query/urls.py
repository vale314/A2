from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from class_query import viewsets
from class_query import views

admin_list = viewsets.AdminViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

admin_detail = viewsets.AdminViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('admin/', admin_list, name='admin-list'),
    path('admin/<int:pk>/', admin_detail, name='admin-detail'),
    path('admin/file/', views.FileUploadList.as_view()),
    path('admin/file/search', views.search_records)
]

urlpatterns = format_suffix_patterns(urlpatterns)
