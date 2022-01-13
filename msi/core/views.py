from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from rest_framework import permissions
from core.models import Doctor, Patient, Specialization, Visit, ExamResult
from core.serializers import DoctorSerializer, PatientSerializer, SpecializationSerializer, VisitSerializer, ExamResultSerializer
from django.core.mail import send_mail
from django.conf import settings
from .tasks import task_send_email
import json

# Create your views here.

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    authentication_classes = []
    serializer_class = DoctorSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    authentication_classes = []
    serializer_class = PatientSerializer

class SpecializationViewSet(viewsets.ModelViewSet):
    queryset = Specialization.objects.all()
    authentication_classes = []
    serializer_class = SpecializationSerializer

class VisitViewSet(viewsets.ModelViewSet):
    queryset = Visit.objects.all()
    authentication_classes = []
    serializer_class = VisitSerializer

    def get_queryset(self):
        specialization_id = self.request.query_params.get('specialization_id')
        currency_code = self.request.query_params.get('currency_code')
        if currency_code:
            self.serializer_class.currency_code = currency_code
        else:
            self.serializer_class.currency_code = 'PLN'
        return Visit.objects.filter(doctor__specialization__id=specialization_id).distinct()

class MailView(viewsets.ViewSet):
    def send(request):
        json_data = json.loads(request.body)
        task = task_send_email.delay(json_data['subject'], json_data['message'], json_data['send_to'])
        return HttpResponse("Mail is being sent!")

class ExamResultViewSet(viewsets.ModelViewSet):
    queryset = ExamResult.objects.all()
    authentication_classes = []
    serializer_class = ExamResultSerializer