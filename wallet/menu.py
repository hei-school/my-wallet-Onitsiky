from cash import get_balance, deposit, withdraw
from transaction import handle_trasaction

def show_menu():
    menu = f"\n  Bienvenue sur My Wallet, votre application de gestion de porte-feuilles.\n     Votre solde actuel est de {get_balance()} ariary.\n     Choisissez une action à faire: \n      1. Déposer de l'argent\n      2. Retirer de l'argent \n      3. Gérer les transactions \n      4. Gérer les cartes \n      5. Quitter l'application \nVotre choix: "
    wrong_choice = "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n"
    valid_choices = [1,2,3,4,5]
    choice = int(input(menu))
    if  choice not in valid_choices:
        print(wrong_choice)
        show_menu()
    elif choice == 1:
        deposit()
    elif choice == 2:
        withdraw()
    elif choice == 3:
        handle_trasaction()
    elif choice == 5:
        print("Merci de votre confiance, à la prochaine !")
