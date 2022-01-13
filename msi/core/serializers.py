# from django.db.models import fields
# from rest_framework import serializers
# from core.models import Doctor, Patient, Specialization, Visit, ExamResult
# from .tasks import task_send_email


# class DoctorSerializer(serializers.ModelSerializer):
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         specialization = validated_data.pop('specialization', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         for spec in specialization:
#             instance.specialization.add(spec)
#         instance.save()
#         return instance


#     class Meta:
#         model = Doctor
#         fields = '__all__'
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

# class PatientSerializer(serializers.ModelSerializer):
#     def create(self, validated_data):
#         password = validated_data.pop('password', None)
#         instance = self.Meta.model(**validated_data)
#         if password is not None:
#             instance.set_password(password)
#         instance.save()
#         return instance

#     class Meta:
#         model = Patient
#         fields = '__all__'
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

# class SpecializationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Specialization
#         fields = '__all__'

# class VisitSerializer(serializers.ModelSerializer):
#     currency_code = 'PLN'
#     class Meta:
#         model = Visit
#         fields = '__all__'
    
#     def to_representation(self, data):
#         data = super(VisitSerializer, self).to_representation(data)
#         exchange_rate = get_exchange_rate(self.currency_code)
#         if exchange_rate:
#             data['cost'] = data['cost'] / exchange_rate
#         data['unit'] = self.currency_code
#         return data

# class ExamResultSerializer(serializers.ModelSerializer):

#     def create(self, validated_data):
#         validated_data['doctor'] = self.context['request'].user
#         instance = super().create(validated_data)
#         # instance.save()
#         task = task_send_email.delay('Wyniki badan', 'Tresc wynikow badan: ' + instance.details, instance.patient.mail)
#         return instance

#     class Meta:
#         model = ExamResult
#         fields = '__all__'
