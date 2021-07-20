from django.db import models


class Provider(models.Model):

    id = models.AutoField(primary_key = True)
    nit = models.CharField(max_length = 20)
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 140)
    
    class Meta:
        app_label = 'supermarket_ms'
