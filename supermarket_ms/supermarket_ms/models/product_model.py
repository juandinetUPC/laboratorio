from django.db import models
from .category_model import Category
from .provider_model import Provider

class Product(models.Model):

    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 20)
    description = models.CharField(max_length = 140)
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    provider = models.ForeignKey(Provider, on_delete = models.CASCADE)
    unit_measurement = models.CharField(max_length = 2)
    quantity = models.IntegerField()

    class Meta:
        app_label = 'supermarket_ms'
