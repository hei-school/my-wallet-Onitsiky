from transaction import make_transaction

cards = []


class Card:
    def __init__(self, number, name, balance):
        self.number = number
        self.name = name
        self.balance = balance

    def display_card(self):
        print(f"La carte {self.name}, ayant le numéro {self.number} "
              "a actuellement en solde: {self.balance} ariary.")


def handle_cards():
    card_menu = (
        "    Choisissez une action à faire: \n"
        "      1. Ajouter une carte\n"
        "      2. Retirer une carte\n"
        "      3. Voir les cartes\n"
        "      4. Recharger une carte\n"
        "      5. Débiter une carte\n Votre choix: "
    )
    wrong_choice = (
        "\n Choix invalide. Veuillez choisir un choix "
        "parmi ceux mentionnés dans le menu.\n"
    )
    valid_choices = [1, 2, 3, 4, 5]
    choice = int(input(card_menu))
    if choice not in valid_choices:
        print(wrong_choice)
        handle_cards()
    elif choice == 1:
        add_card()
    elif choice == 2:
        remove_card()
    elif choice == 3:
        list_cards()
    elif choice == 4:
        refill_card()
    elif choice == 5:
        debit_card()


def add_card():
    number = input("    Veuillez entrer le numéro de votre carte: ")
    name = input("    Veuillez entrer le nom de votre carte: ")
    balance = int(input("    Veuillez entrer le montant "
                        "du solde de votre carte: "))
    if balance < 0:
        print("\n  Le montant de votre retrait devrait-ếtre "
              "une valeur positive, différente de 0.\n")
        add_card()
    else:
        cards.append(Card(number=number, name=name, balance=balance))
        print("\n  Carte ajoutée avec succès.\n")
        from menu import show_menu
        show_menu()


def remove_card():
    global cards
    to_remove = input("\n    Veuillez renseigner le numéro "
                      "de carte à retirer: ")
    exists = any(item.number == to_remove for item in cards)
    if not exists:
        print("\n    La carte spécifiée n'existe pas.")
        remove_card()
    else:
        cards = [card for card in cards
                 if card.number.lower() != to_remove.lower()]
        print("\n    Carte retirée avec succès.\n")
        from menu import show_menu
        show_menu()


def list_cards():
    for item in cards:
        print(f"{item.display_card()}\n")
    from menu import show_menu
    show_menu()


def refill_card():
    global cards
    number = input("    Veuillez entrer le numéro de votre carte: ")
    exists = any(item.number == number for item in cards)
    if not exists:
        print("\n    La carte spécifiée n'existe pas.")
        refill_card()
    else:
        amount = int(input("    Veuillez entrer le montant à ajouter: "))
        if amount < 0:
            print("\n  Vous avez entré une valeur invalide."
                  " Veuillez entrer une valeur supérieure à 0.\n")
            refill_card()
        else:
            cards = [Card(card.number, card.name, card.balance + amount)
                     if card.number.lower() == number.lower() else card
                     for card in cards]
            print("\n    Balance de la carte mise à jour avec succès.\n")
            make_transaction(f"recharge sur la carte {number}", amount=amount)
            from menu import show_menu
            show_menu()


def debit_card():
    global cards
    number = input("    Veuillez entrer le numéro de votre carte: ")
    exists = any(item.number == number for item in cards)
    if not exists:
        print("\n    La carte spécifiée n'existe pas.")
        debit_card()
    else:
        amount = int(input("\    Veuillez entrer le montant à débiter: "))
        if amount < 0:
            print("\n  Vous avez entré une valeur invalide."
                  " Veuillez entrer une valeur supérieure à 0.\n")
            debit_card()
        else:
            cards = [Card(card.number, card.name, card.balance - amount)
                     if card.number.lower() == number.lower()
                     else card for card in cards]
            print(f"\n    Montant de {amount} débitée avec succès.\n")
            make_transaction(f"retrait sur la carte {number}", amount=amount)
            from menu import show_menu
            show_menu()
