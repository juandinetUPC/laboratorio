from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from users_ms.views.user_view import UserList
from users_ms.views.user_view import UserDetail
# from users_ms.views.product_view import ProductList
# from users_ms.views.product_view import ProductDetail
# from users_ms.views.provider_view import ProviderList
# from users_ms.views.provider_view import ProviderDetail
urlpatterns = [
    path('users/', UserList.as_view()),
    path('users/<int:pk>', UserDetail.as_view()),
    # path('products/', ProductList.as_view()),
    # path('products/<int:pk>', ProductDetail.as_view()),
    # path('providers/', ProviderList.as_view()),
    # path('providers/<int:pk>', ProviderDetail.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)