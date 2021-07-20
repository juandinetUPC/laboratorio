from rest_framework import serializers
from supermarket_ms.models.provider_model import Provider

class ProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Provider
        fields = ['id', 'nit', 'name', 'description']
