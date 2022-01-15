from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from core.models import Dispositor, Driver, Location, Squad, Ambulance, AmbulanceCall
from core.serializers import DispositorSerializer, DriverSerializer, LocationSerializer, SquadSerializer, \
    AmbulanceSerializer, AmbulanceCallSerializer
from django.core.mail import send_mail
from django.conf import settings
from .tasks import task_send_email
import json


# Create your views here.

class DispositorViewSet(viewsets.ModelViewSet):
    queryset = Dispositor.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DispositorSerializer


class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    authentication_classes = []
    serializer_class = DriverSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    authentication_classes = []
    serializer_class = LocationSerializer


class SquadViewSet(viewsets.ModelViewSet):
    queryset = Squad.objects.all()
    authentication_classes = []
    serializer_class = SquadSerializer


class AmbulanceViewSet(viewsets.ModelViewSet):
    queryset = Ambulance.objects.all()
    authentication_classes = []
    serializer_class = AmbulanceSerializer


class AmbulanceCallViewSet(viewsets.ModelViewSet):
    queryset = AmbulanceCall.objects.all()
    authentication_classes = []
    serializer_class = AmbulanceCallSerializer
