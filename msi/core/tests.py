from django.test.testcases import TestCase
from django.urls import reverse, path, include
from rest_framework.test import APITestCase
from .models import *
import json

#Create your tests here.

class DoctorTests(APITestCase):

    def test_create_doctor(self):
        self.assertEqual(True,True)

