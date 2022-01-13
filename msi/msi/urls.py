from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core import views

router = routers.DefaultRouter()
# router.register(r'doctors', views.DoctorViewSet)
# router.register(r'patients', views.PatientViewSet)
# router.register(r'specializations', views.SpecializationViewSet)
# router.register(r'visits', views.VisitViewSet)
# router.register(r'exam-results', views.ExamResultViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/mail', views.MailView.send)
]