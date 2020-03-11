from django.http import HttpResponse
import os
from django.contrib.staticfiles.views import serve
import academic_offer

def show_index(request):
    app_dirname = os.path.dirname(academic_offer.__file__)
    absolute_index_file_path = os.path.join(app_dirname, '../../client/public/index.html')
    absolute_index_file_path = os.path.abspath(absolute_index_file_path)
    file = open(absolute_index_file_path)
    return HttpResponse(content=file)
