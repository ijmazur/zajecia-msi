# from django.test.testcases import TestCase
# from django.urls import reverse, path, include
# from rest_framework.test import APITestCase
# from .models import Doctor, Specialization
# import json

# Create your tests here.

# class DoctorTests(APITestCase):
#     def setUp(self):
#         Specialization.objects.create(name="test specialization")
#         self.url = 'http://127.0.0.1:8000/'

#     def test_create_doctor(self):
#         data = {
#             "first_name": "Andrzej",
#             "last_name": "Wiertara",
#             "date_of_birth": "2000-10-22",
#             "username": "awiertara2",
#             "password": "testtesttest",
#             "mail": "test@test.com",
#             "specialization": [1]
#         }
#         response = self.client.post(self.url + 'doctors/', data, format = 'json')
#         self.assertEqual(response.status_code, 201)
#         created_doctor_response = self.client.get(self.url + 'doctors/', format = 'json')
#         self.assertEqual(created_doctor_response.status_code, 200)
#         doctor = json.loads(created_doctor_response.content)[0]
#         self.assertEqual(doctor['username'], 'awiertara2')
#         self.assertEqual(doctor['specialization'], [1])

#     def test_login_as_doctor(self):
#         data = {
#             "username": "awiertara2",
#             "password": "testtesttest"
#         }
#         response = self.client.post(self.url + 'api/token/', data, format = 'json')
#         self.assertEqual(response.status_code, 200)
#         data = json.loads(response.content)
#         self.assertIsNotNone(data['access'])
#         self.assertIsNotNone(data['refresh'])