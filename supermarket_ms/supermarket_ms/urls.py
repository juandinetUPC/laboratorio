from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from supermarket_ms.views.category_view import CategoryList
from supermarket_ms.views.category_view import CategoryDetail
from supermarket_ms.views.product_view import ProductList
from supermarket_ms.views.product_view import ProductDetail
from supermarket_ms.views.provider_view import ProviderList
from supermarket_ms.views.provider_view import ProviderDetail
urlpatterns = [
    path('categories/', CategoryList.as_view()),
    path('categories/<int:pk>', CategoryDetail.as_view()),
    path('products/', ProductList.as_view()),
    path('products/<int:pk>', ProductDetail.as_view()),
    path('providers/', ProviderList.as_view()),
    path('providers/<int:pk>', ProviderDetail.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)