from django.db import models
from django.conf import settings
from django.db.models.signals import post_save, pre_save, post_delete
import uuid
import os
import csv
from django.utils import timezone
from django.db.models import Q
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class User(AbstractUser):
    db_table='auth_user'
    name = models.TextField(max_length=50)
    phone = models.TextField(max_length=15)
    is_staff = models.BooleanField(default=False)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    objects = CustomUserManager()


class Record(models.Model):
    nrc = models.TextField(max_length=7)
    st = models.CharField(max_length=3)
    # all rows are padded to 50 chars so...
    department = models.TextField(max_length=50)
    career_code = models.TextField(max_length=7)
    subject_key = models.TextField(max_length=7)
    # max subject_name on test file is 89 so just to be sure
    subject_name = models.TextField(max_length=100)
    theory_hours = models.SmallIntegerField()
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


class Incoherence(models.Model):
    records = models.ManyToManyField(Record)
    # To be parsed as JSON
    incoherent_fields = models.TextField(max_length=50)
    message = models.TextField(max_length=100)


class FileUpload(models.Model):
    def get_upload_location(self, filename):
        ext = filename.split('.')[-1]
        filename = "{}.{}".format(uuid.uuid4(), ext)
        return os.path.join('files', filename)

    uploaded_at = models.DateTimeField(auto_now=True)
    finished_parsing_at = models.DateTimeField(null=True)
    file = models.FileField(upload_to=get_upload_location)
    uploader = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
        db_constraint=False
    )

def parse_file(sender, instance, **kwargs):
    # only run this if file is not already parsed
    if (instance.finished_parsing_at):
        return
    rows = []
    # TODO: use multiple threads
    with open(instance.file.url, 'r', encoding='latin1') as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            # skip this row if it does not have a NRC
            if not (len(row) and row[0] and row[0] != 'NRC'):
                continue
            new_record = Record()
            new_record.nrc = row[0]
            new_record.st = row[1]
            new_record.department = row[2]
            new_record.career_code = row[3]
            new_record.subject_key = row[4]
            new_record.subject_name = row[5]
            new_record.theory_hours = row[6]
            new_record.lab_hours = row[7] if row[7] else 0
            new_record.section = row[8]
            new_record.credits = row[9]
            new_record.places = row[10]
            new_record.places_taken = row[11]
            new_record.places_available = row[12]
            new_record.start_time = (row[13][:-2] + ":" + row[13][-2:]) if len(row[13]) > 2 else "00:00"
            new_record.end_time = (row[14][:-2] + ":" + row[14][-2:]) if len(row[14]) > 2 else "00:00"
            new_record.class_on_monday = bool(row[15])
            new_record.class_on_tuesday = bool(row[16])
            new_record.class_on_wednesday = bool(row[17])
            new_record.class_on_thursday = bool(row[18])
            new_record.class_on_friday = bool(row[19])
            new_record.class_on_saturday = bool(row[20])
            new_record.building = row[21]
            new_record.classroom = row[22]
            new_record.teacher_raw = row[23]

            if len(row[24]):
                new_record.start_date = "-".join(reversed(row[24].split('/')))
            else:
                new_record.start_date = "2020-10-10"

            if len(row[25]):
                new_record.end_date = "-".join(reversed(row[25].split('/')))
            else:
                new_record.end_date = "2020-10-10"

            new_record.level = row[26]

            new_record.save()

    # logs datetime at the time file finishes parsing
    instance.finished_parsing_at = timezone.now()
    instance.save(update_fields=['finished_parsing_at'])

def delete_previous_records(sender, instance, **kwargs):
    # only deletes objects if new FileUpload
    if (not instance.pk):
        Record.objects.all().delete()
        # also delete all Incoherences since they don't apply anymore
        Incoherence.objects.all().delete()

def find_incoherences(sender, instance, **kwargs):
    # get incoherent records saved previously
    colliding_records = Record.objects.all()
    colliding_records = colliding_records.filter(building=instance.building)
    colliding_records = colliding_records.filter(classroom=instance.classroom)
    colliding_records = colliding_records.filter(start_time__lte=instance.end_time)
    colliding_records = colliding_records.filter(end_time__gte=instance.start_time)

    # only get records that happen on those same days
    colliding_records = colliding_records.filter((Q(class_on_monday=instance.class_on_monday) & Q(class_on_monday=True))
                                              | (Q(class_on_tuesday=instance.class_on_tuesday) & Q(class_on_tuesday=True))
                                              | (Q(class_on_wednesday=instance.class_on_wednesday) & Q(class_on_wednesday=True))
                                              | (Q(class_on_thursday=instance.class_on_thursday) & Q(class_on_thursday=True))
                                              | (Q(class_on_friday=instance.class_on_friday) & Q(class_on_friday=True))
                                              | (Q(class_on_saturday=instance.class_on_saturday) & Q(class_on_saturday=True)))
    if colliding_records.count():
        # see if collision already exists
        collision_queryset = Incoherence.objects.filter(incoherent_fields='collision')
        collision_queryset = collision_queryset.prefetch_related('records')

        relevant_collision = None

        for collision in collision_queryset:
            # check if colliding records in given collision are the same that
            # are present in current collision
            if set(collision.records.all()) == set(colliding_records.exclude(pk=instance.pk)):
                relevant_collision = collision
                relevant_collision.records.add(instance)
                break

        # otherwise, if incoherence hasn't been detected before
        if relevant_collision is None:
            incoherence = Incoherence()
            incoherence.incoherent_fields = 'collision'
            incoherence.message = 'Existe una colisión entre los horarios de estas clases y el salón en el que se encuentran'
            incoherence.save()
            incoherence.records.add(*colliding_records)

# post_save signal for FileUpload that calls upload_file
post_save.connect(parse_file, sender=FileUpload)
# Delete all previously saved records when a new file is uploaded
pre_save.connect(delete_previous_records, sender=FileUpload)

# post_save signal for Records for detecting incoherences
post_save.connect(find_incoherences, sender=Record)
