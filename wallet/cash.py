balance = 0

def get_balance():
    return balance

def deposit():
    global balance
    amount = int(input("  Entrez le montant à déposer: "))
    if amount <= 0:
        print("\n  Vous avez entré une valeur invalide. Veuiller entre une valeur supérieure à 0.\n")
        deposit()
    else:
        balance += amount
        print(f"\n  Dépôt de {amount} ariary effectué avec succès. \n")
        from menu import show_menu
        show_menu()

def withdraw():
    global balance
    amount = int(input("  Entrez le montant à retirer: "))
    if amount <= 0:
        print("\n  Vous avez entré une valeur invalide. Veuiller entre une valeur supérieure à 0.\n")
        withdraw()
    if balance < amount:
        print("\n  Votre solde actuel est insuffisant pour cette action.\n")
        from menu import show_menu
        show_menu()
    else:
        balance -= amount
        print(f"\n  Retrait de {amount} ariary effectué avec succès. \n")
        from menu import show_menu
        show_menu()