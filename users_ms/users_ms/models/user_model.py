from django.db import models

class User(models.Model):

    id = models.AutoField(primary_key = True)
    user_name = models.CharField(max_length = 20)
    user_password = models.TextField(max_length = 20)
    user_email = models.TextField(max_length = 50)
    user_real_name= models.TextField(max_length = 150)
    

    class Meta:
        app_label = 'users_ms'
