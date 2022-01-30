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

    #Test busy option in viewset
    def test_ambulance_view_set_busy(self):
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
        created_ambulance_response = self.client.get(self.url+'ambulances/?option=busy', format='json')
        self.assertEqual(created_ambulance_response.status_code,200)

    #Test bad option in viewset
    def test_ambulance_view_set_bad_option(self):
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
        created_ambulance_response = self.client.get(self.url+'ambulances/?option=UMCS', format='json')
        self.assertEqual(created_ambulance_response.status_code,400)


    #shouldnt create ambulance with blank
    def test_AmbulanceBlank(self):
        data = {
            "number": 2,
            "city": "Lublin",
            "vehicle_name": "BMW",
            "registration_number": "CROW2137",
            "status": 0
        }
        response = self.client.post(self.url + 'ambulances/', data, format='json')
        self.assertEqual(response.status_code, 400)

    #Tests to check every option
    #===========================================================================================
    def test_AmbulancestreetBadStreet(self):
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

    def test_AmbulanceBadNumber(self):
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

    def test_AmbulancestreetBadCity(self):
        data = {
            "street": "Leszka",
            "number": "dwa",
            "city": 10,
            "vehicle_name": "BMW",
            "registration_number": "CROW2137",
            "status": 0
        }
        response = self.client.post(self.url + 'ambulances/', data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_AmbulanceBadNumberBadVehicle_Name(self):
        data = {
            "street": "Leszka",
            "number": "dwa",
            "city": "Lublin",
            "vehicle_name": 10,
            "registration_number": "CROW2137",
            "status": 0
        }
        response = self.client.post(self.url + 'ambulances/', data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_AmbulancestreetBadStatus(self):
        data = {
            "street": "Leszka",
            "number": "dwa",
            "city": "Lublin",
            "vehicle_name": "BMW",
            "registration_number": "CROW2137",
            "status": "Free"
        }
        response = self.client.post(self.url + 'ambulances/', data, format='json')
        self.assertEqual(response.status_code, 400)
    #===========================================================================================




class HospitalUser(APITestCase):
    def setUp(self):
        self.url='http://127.0.0.1:8000/'

    #create driver
    def test_driver(self):
        data = {
            "first_name": "Marcin",
            "last_name": "Borkowski",
            "date_of_birth":"2000-08-31",
            "username": "SiemaEniu12",
            "password": "SiemaEniu13",
            "mail": "siemaeniu@gmail.com"
        }
        response = self.client.post(self.url+'drivers/',data,format='json')
        self.assertEqual(response.status_code,201)
        created_driver_response = self.client.get(self.url+'drivers/', format='json')
        self.assertEqual(created_driver_response.status_code,200)

    #shouldnt create driver with bad option
    def test_driver_bad_option_first_name(self):
        data = {
            "first_name":10,
            "last_name": "Borkowski",
            "date_of_birth":"2000-08-31",
            "username": "SiemaEniu12",
            "password": "SiemaEniu13",
            "mail": "siemaeniu@gmail.com"
        }
        response = self.client.post(self.url+'drivers/',data,format='json')
        self.assertEqual(response.status_code,400)

    #shouldnt create driver  with bad date of birth option
    def test_driver_bad_option_date(self):
        data = {
            "first_name":"Marcin",
            "last_name": "Borkowski",
            "date_of_birth":2000,
            "username": "SiemaEniu12",
            "password": "SiemaEniu13",
            "mail": "siemaeniu@gmail.com"
        }
        response = self.client.post(self.url+'drivers/',data,format='json')
        self.assertEqual(response.status_code,400)

    #shouldnt create driver with blank
    def test_driver_blank(self):
        data = {
            "last_name": "Borkowski",
            "date_of_birth":"2000-08-31",
            "username": "SiemaEniu12",
            "password": "SiemaEniu13",
            "mail": "siemaeniu@gmail.com"
        }
        response = self.client.post(self.url+'drivers/',data,format='json')
        self.assertEqual(response.status_code,400)


    #create driver
    def test_login_as_driver(self):
        data = {
            "first_name": "Marcin",
            "last_name": "Borkowski",
            "date_of_birth":"2000-08-31",
            "username": "SiemaEniu12",
            "password": "SiemaEniu13",
            "mail": "siemaeniu@gmail.com"
        }
        response = self.client.post(self.url+'drivers/',data,format='json')
        self.assertEqual(response.status_code,201)
        data =json.loads(response.content)
        self.assertIsNotNone(data['access'])
        self.assertIsNotNone(data['refresh'])



