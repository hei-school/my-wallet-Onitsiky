from datetime import datetime

transactions = []


class Transaction:
    def __init__(self, type, amount):
        self.type = type
        self.amount = amount
        self.date = datetime.now()

    def display_transaction(self):
        print(f"{self.date}, un {self.type} de {self.amount} ariary.")


def make_transaction(type, amount):
    transactions.append(Transaction(type, amount))


def get_transactions():
    return transactions


def handle_transaction():
    transaction_menu = (
        "    Choisissez une action à faire: \n"
        "     1. Voir la liste des transactions\n Votre choix: "
    )
    wrong_choice = (
        "\n Choix invalide. Veuillez choisir un choix "
        "parmi ceux mentionnés dans le menu.\n"
    )
    valid_choices = [1]
    choice = int(input(transaction_menu))
    if choice not in valid_choices:
        print(wrong_choice)
        handle_transaction()
    elif choice == 1:
        for item in transactions:
            print(f"{item.display_transaction() }\n")
        from menu import show_menu
        show_menu()
