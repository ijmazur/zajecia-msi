from django.db.models import fields
from rest_framework import serializers
from core.models import Dispositor, Driver, Location, Squad, Ambulance, AmbulanceCall
from .tasks import task_send_email


class DispositorSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = Dispositor
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }


class DriverSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = Driver
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class SquadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Squad
        fields = '__all__'


class AmbulanceSerializer(serializers.ModelSerializer):

    # def create(self, validated_data):
    #     validated_data['doctor'] = self.context['request'].user
    #     instance = super().create(validated_data)
    #     # instance.save()
    #     task = task_send_email.delay('Wyniki badan', 'Tresc wynikow badan: ' + instance.details, instance.patient.mail)
    #     return instance

    class Meta:
        model = Ambulance
        fields = '__all__'


class AmbulanceCallSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmbulanceCall
        fields = '__all__'