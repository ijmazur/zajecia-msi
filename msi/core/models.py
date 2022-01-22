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

class Location(models.Model):
    street = models.CharField(max_length=30)
    number = models.IntegerField()
    city = models.CharField(max_length=30)

    class Meta:
        abstract = True

class Squad(models.Model):
    name = models.CharField(max_length=30)

class Driver(HospitalUser):
    squad = models.ForeignKey(Squad, on_delete=models.DO_NOTHING, default=None, null=True)

class Ambulance(Location):
    vehicle_name = models.CharField(max_length=30)
    registration_number = models.CharField(max_length=10)
    status = models.IntegerField(default=0)

class AmbulanceCall(Location):
    description = models.TextField()
    priority = models.IntegerField()
    assigned_ambulance = models.ForeignKey(Ambulance, on_delete=models.SET_NULL, default=None, null=True)
    assigned_squad = models.ForeignKey(Squad, on_delete=models.SET_NULL, default=None, null=True)

