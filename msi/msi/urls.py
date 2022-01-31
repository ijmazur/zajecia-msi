from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core import urls

router = routers.DefaultRouter()
urlpatterns = [
    path('', include(urls))
]