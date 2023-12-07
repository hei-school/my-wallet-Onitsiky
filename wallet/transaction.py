from datetime import datetime

transactions = []

class Transaction:
    def __init__(self, type, amount):
        self.type = type
        self.amount = amount
        self.date = datetime.now()

    def display_transaction(self):
        print(f"{self.date}, un {self.type} de {self.amount} ariary.")

def make_transactions(type, amount):
    transactions.append(Transaction(type, amount))

def get_transactions():
    return transactions