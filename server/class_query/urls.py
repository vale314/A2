from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from class_query import viewsets
from class_query import views

admin_detail = viewsets.AdminViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

user_detail = viewsets.UserViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    path('/admin/', views.show_current_user, name='admin-list'),
    path('/admin/all', views.list_admins, name='admin-all'),
    path('/admin/<int:pk>', admin_detail, name='admin-detail'),
    path('/admin/file', views.FileUploadList.as_view(), name="file-records"),
    path('/admin/data', upload_records, name="json-record-upload"),
    path('/admin/file/<int:pk>', views.FileUploadDetail.as_view()),
    path('/admin/file/search', views.search_records),
    path('/user', views.create_user, name="user-create"),
    path('/user/<int:pk>', user_detail, name="user-detail"),
    path('/user/all', views.list_users, name='user-list'),
    path('/collisions', views.show_collisions),
]

urlpatterns = format_suffix_patterns(urlpatterns)
