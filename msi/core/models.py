from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import User, UserManager

# Create your models here.
class Specialization(models.Model):
    name = models.CharField(max_length=30)

class HospitalUser(AbstractBaseUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_of_birth = models.DateField()
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=255)
    mail = models.EmailField(max_length=254)
    objects = UserManager()
    USERNAME_FIELD = 'username'

class Doctor(HospitalUser):
    specialization = models.ManyToManyField(Specialization)

class Patient(HospitalUser):
    pass

class Visit(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateTimeField()
    location = models.CharField(max_length=30)
    cost = models.IntegerField()

class ExamResult(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    visit = models.ForeignKey(Visit, null=True, on_delete=models.CASCADE, blank=True)
    details = models.TextField()

