from django.test.testcases import TestCase
from django.urls import reverse, path, include
from rest_framework.test import APITestCase
from .models import *
import json

#Create your tests here.

class Ambulance(APITestCase):

    #"First Test"
    def test_test(self):
        self.assertEqual(True,True)

    #create ambulance
    def test_Ambulance(self):
        data = {
            "street": "Leszka",
            "number": 2,
            "city": "Lublin",
            "vehicle_name":"BMW",
            "registration_number":"CROW2137",
            "status":0
        }
        response = self.client.post('http://127.0.0.1:8000/ambulances/',data,format='json')
        self.assertEqual(response.status_code,201)

