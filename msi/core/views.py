from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import permissions
from core.models import Dispositor, Driver, Location, Squad, Ambulance, AmbulanceCall
from core.serializers import DispositorSerializer, DriverSerializer, SquadSerializer, \
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


class SquadViewSet(viewsets.ModelViewSet):
    queryset = Squad.objects.all()
    authentication_classes = []
    serializer_class = SquadSerializer


class AmbulanceViewSet(viewsets.ModelViewSet):
    queryset = Ambulance.objects.all()
    authentication_classes = []
    serializer_class = AmbulanceSerializer


    def list(self, request):
        option = request.query_params.get('option')
        if option == 'all':
            objects = Ambulance.objects.all()
        elif option == 'busy':
            objects = Ambulance.objects.filter(status=1)
        elif option == 'free':
            objects = Ambulance.objects.filter(status=0)
        else:
            return Response('Invalid option parameter', status=status.HTTP_400_BAD_REQUEST)
        serializer = AmbulanceSerializer(objects, many=True)
        return Response(serializer.data)


class AmbulanceCallViewSet(viewsets.ModelViewSet):
    queryset = AmbulanceCall.objects.all()
    authentication_classes = []
    serializer_class = AmbulanceCallSerializer


class UserInfoView(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get_user_data(self, request):
        user_id = int(request.user.id)
        if Dispositor.objects.filter(pk=user_id).exists():
            user = Dispositor.objects.get(pk=user_id)
            serializer = DispositorSerializer(user, many=False)
            response = serializer.data
            response['type'] = 'dispositor'
            return Response(response)
        elif Driver.objects.filter(pk=user_id).exists():
            user = Driver.objects.get(pk=user_id)
            serializer = DriverSerializer(user, many=False)
            response = serializer.data
            response['type'] = 'driver'
            return Response(response)