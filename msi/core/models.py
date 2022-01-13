from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import UserManager

# Create your models here.

class HospitalUser(AbstractBaseUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_of_birth = models.DateField()
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=255)
    mail = models.EmailField(max_length=254)
    objects = UserManager()
    USERNAME_FIELD = 'username'

class Dispositor(HospitalUser):
    pass

class Driver(HospitalUser):
    pass

class Location(models.Model):
    street = models.CharField(max_length=30)
    number = models.IntegerField()
    city = models.CharField(max_length=30)

class Squad(models.Model):
    name = models.CharField(max_length=30)
    drivers = models.ForeignKey(Driver, on_delete=models.DO_NOTHING)

class Ambulance(models.Model):
    registration_number = models.CharField(max_length=30)
    status = models.IntegerField()
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)

class AmbulanceCall(models.Model):
    description = models.TextField()
    priority = models.IntegerField()
    caller_location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    assigned_ambulance = models.ForeignKey(Ambulance, on_delete=models.SET_NULL, default=None, null=True)
    assigned_squad = models.ForeignKey(Squad, on_delete=models.SET_NULL, default=None, null=True)

# class Doctor(HospitalUser):
#     specialization = models.ManyToManyField(Specialization)

# class Patient(HospitalUser):
#     pass

# class Visit(models.Model):
#     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
#     date = models.DateTimeField()
#     location = models.CharField(max_length=30)
#     cost = models.IntegerField()

# class ExamResult(models.Model):
#     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
#     visit = models.ForeignKey(Visit, null=True, on_delete=models.CASCADE, blank=True)
#     details = models.TextField()

