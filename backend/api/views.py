from django.shortcuts import render
from rest_framework import generics
from .models import Transaction
from .serializer import TransactionSerializer

class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all() # Je dis comment reccuperer la liste des transactions
    serializer_class = TransactionSerializer # je precise quel serializer utiliser pour convertir les objets en JSON et vice versa

#je suis aller creer des urls pour creer les routes dans un fichier urls.py

# je viens creer la class pour le Update et Delete

class TransactionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView): # cette class permet de recuperer, mettre a jour et supprimer une transaction specifique
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'  # Je precise que je vais utiliser l'id pour retrouver une transaction specifique

# je vais aller creer les urls pour ces routes aussi, pour pouvoir appeler cet API aussi 