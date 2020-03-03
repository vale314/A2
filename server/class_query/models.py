from django.db import models
import uuid
import os

class Record(models.Model):
    nrc = models.TextField(max_length=7)
    sr = models.CharField()
    # all rows are padded to 50 chars so...
    department = models.TextField(max_length=50)
    career_code = models.TextField(max_length=7)
    subject_key = models.TextField(max_length=7)
    # max subject_name on test file is 89 so just to be sure
    subject_name = models.TextField(max_length=100)
    lab_hours = models.SmallIntegerField()
    section = models.TextField(max_length=3)
    credits = models.SmallIntegerField()
    places = models.SmallIntegerField()
    places_taken = models.SmallIntegerField()
    places_available = models.SmallIntegerField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    class_on_monday = models.BooleanField()
    class_on_tuesday = models.BooleanField()
    class_on_wednesday = models.BooleanField()
    class_on_thursday = models.BooleanField()
    class_on_friday = models.BooleanField()
    class_on_saturday = models.BooleanField()
    building = models.TextField(max_length=5)
    classroom = models.TextField(max_length=5)
    teacher_raw = models.TextField(max_length=60)
    start_date = models.DateField()
    end_date = models.DateField()
    level = models.TextField(max_length=5)

class FileUpload(models.Model):
    def get_upload_location(self, filename):
        ext = filename.split('.')[-1]
        filename = "{}.{}".format(uuid.uuid4(), ext)
        return os.path.join('files', filename)

    uploaded_at = models.DateTimeField(auto_now=True)
    file = models.FileField(upload_to='files/')
    uploader = models.ForeignKey('django.contrib.auth.User',
                                 on_delete=models.DO_NOTHING)
    total_records = models.IntegerField()
