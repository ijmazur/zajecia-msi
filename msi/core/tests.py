from django.test.testcases import TestCase
from django.urls import reverse, path, include
from rest_framework.test import APITestCase
from .models import *
import json

#Create your tests here.

class Ambulance(APITestCase):

    def setUp(self):
        self.url='http://127.0.0.1:8000/'

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
        response = self.client.post(self.url+'ambulances/',data,format='json')
        self.assertEqual(response.status_code,201)
        created_ambulance_response = self.client.get(self.url+'ambulances/?option=all', format='json')
        self.assertEqual(created_ambulance_response.status_code,200)

    #shouldnt create ambulance with bad options
    def test_AmbulanceNO(self):
        data = {
            "street": "Leszka",
            "number": "dwa",
            "city": "Lublin",
            "vehicle_name": "BMW",
            "registration_number": "CROW2137",
            "status": 0
        }
        response = self.client.post(self.url + 'ambulances/', data, format='json')
        self.assertEqual(response.status_code, 400)


