from cash import get_balance, deposit, withdraw
from transaction import handle_transaction
from card import handle_cards


def show_menu():
    menu = (
        f"\n  Bienvenue sur My Wallet, votre application de gestion de "
        f"porte-feuilles."
        f"\n     Votre solde actuel est de {get_balance()} ariary."
        f"\n     Choisissez une action à faire: \n"
        f"      1. Déposer de l'argent\n"
        f"      2. Retirer de l'argent \n"
        f"      3. Gérer les transactions \n"
        f"      4. Gérer les cartes \n"
        f"      5. Quitter l'application \nVotre choix: "
    )
    wrong_choice = (
                f"\n Choix invalide. Veuillez choisir un choix parmi"
                f" ceux mentionnés dans le menu.\n"
    )
    valid_choices = [1, 2, 3, 4, 5]
    choice = int(input(menu))
    if choice not in valid_choices:
        print(wrong_choice)
        show_menu()
    elif choice == 1:
        deposit()
    elif choice == 2:
        withdraw()
    elif choice == 3:
        handle_transaction()
    elif choice == 4:
        handle_cards()
    elif choice == 5:
        print("Merci de votre confiance, à la prochaine !")
