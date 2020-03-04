from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
import uuid
import os


class Record(models.Model):
    nrc = models.TextField(max_length=7)
    sr = models.CharField(max_length=3)
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
    uploader = models.ForeignKey(User, on_delete=models.DO_NOTHING)

def upload_file(sender, instance, **kwargs):
    rows = []
    with open(instance.file.url, 'r', encoding='latin1') as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            # skip this row if it does not have a NRC
            if not (len(row) and row[0] and row[0] != 'NRC'):
                continue
            new_record = Record(**{
                'nrc': row[0],
                'st': row[1],
                'department': row[2],
                'career': row[3],
                'subject_key': row[4],
                'subject_name': row[5],
                'theory_hours': row[6],
                'lab_hours': row[7],
                'section': row[8],
                'credits': row[9],
                'places': row[10],
                'places_taken': row[11],
                'places_available': row[12],
                'start_time': row[13],
                'end_time': row[14],
                'monday': bool(row[15]),
                'tuesday': bool(row[16]),
                'wednesday': bool(row[17]),
                'thursday': bool(row[18]),
                'friday': bool(row[19]),
                'saturday': bool(row[20]),
                'building': row[21],
                'classroom': row[22],
                'teacher_raw': row[23],
                'start_date': row[24],
                'end_date': row[25],
                'level': row[26],
            })
            new_record.save()

"""
post_save signal for FileUpload that calls upload_file
"""
post_save.connect(upload_file, sender=FileUpload)
