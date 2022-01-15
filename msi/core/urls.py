from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core import views

router = routers.DefaultRouter()
router.register(r'dispositors', views.DispositorViewSet)
router.register(r'drivers', views.DriverViewSet)
router.register(r'locations', views.LocationViewSet)
router.register(r'squads', views.SquadViewSet)
router.register(r'ambulances', views.AmbulanceViewSet)
router.register(r'ambulance-calls', views.AmbulanceCallViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/user', views.UserInfoView.as_view({'get': 'get_user_data'}))
]
