import java.util.List;
import java.util.Scanner;

public class Menu {
  public static final Scanner input = new Scanner(System.in);

  private static final String invalidChoice = "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n";

  private static final List<Integer> validChoices = List.of(1,2,3,4,5);
  public static void showMenu(Integer balance) {
    String menu = "\n  Bienvenue sur My Wallet, votre application de gestion de porte-feuilles.\n    Votre solde actuel est de " + balance + " ariary.\n" +
        "    Choisissez une action à faire: \n      1. Déposer de l'argent\n      2. Retirer de l'argent \n      3. Gérer les transactions \n      4. Gérer les cartes \n" +
        "      5. Quitter l'application \nVotre choix: ";
    System.out.println(menu);
    Integer choice = input.nextInt();
    if(!validChoices.contains(choice)) {
      System.out.println(invalidChoice);
      showMenu(Cash.getBalance());
    } else {
      switch (choice){
        case 1:
          Cash.deposit();
        case 2:
          Cash.withDraw();
        case 5:
          System.out.println("Merci de votre confiance, à la prochaine !");
      }
    }
  }
}
