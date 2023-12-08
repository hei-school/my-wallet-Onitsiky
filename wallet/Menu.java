import java.util.List;
import java.util.Scanner;

public class Menu {
  public static final Scanner input = new Scanner(System.in);

  public static final String invalidChoice =
      "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n";

  private static final List<Integer> validChoices = List.of(1, 2, 3, 4, 5);

  public static void showMenu(Integer balance) {
    String menu =
        new StringBuilder().append(
                "\n  Bienvenue sur My Wallet, votre application de gestion de porte-feuilles.\n    Votre solde actuel est de ")
            .append(balance).append(" ariary.\n").append(
                "    Choisissez une action à faire: \n      1. Déposer de l'argent\n      2. Retirer de l'argent \n      3. Gérer les transactions \n      4. Gérer les cartes \n")
            .append("      5. Quitter l'application \nVotre choix: ").toString();
    System.out.println(menu);
    Integer choice = input.nextInt();
    if (!validChoices.contains(choice)) {
      System.out.println(invalidChoice);
      showMenu(Cash.getBalance());
    } else {
      switch (choice) {
        case 1:
          Cash.deposit();
          break;
        case 2:
          Cash.withDraw();
          break;
        case 3:
          Transaction.handleTransactions();
          break;
        case 4:
          Card.handleCard();
          break;
        case 5:
          System.out.println("Merci de votre confiance, à la prochaine !");
          break;
      }
    }
  }
}
