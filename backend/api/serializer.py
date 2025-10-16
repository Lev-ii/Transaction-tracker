from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    text = serializers.CharField()  # mappe 'text' vers 'title'
    amount = serializers.FloatField()  # convertit Decimal en float (facile à manipuler côté front)
    created_at = serializers.DateTimeField(read_only=True)  # renomme 'created_at'
    

    class Meta:
        model = Transaction
        fields = ['id', 'text', 'amount', 'created_at']
        read_only_fields = ('id', 'created_at')
