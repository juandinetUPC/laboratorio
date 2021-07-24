from rest_framework import serializers
from users_ms.models.user_model import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'user_name', 'user_password','user_email','user_real_name']




