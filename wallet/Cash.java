public class Cash {
  public static int balance = 0;

  public static int getBalance() {
    return balance;
  }

  public static void withDraw() {
    System.out.println("  Entrez le montant à retirer: ");
    Integer montant = Menu.input.nextInt();
    if (montant <= 0) {
      System.out.println(
          "\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n");
      withDraw();
    }
    if (balance < montant) {
      System.out.println("\n  Votre solde actuel est insuffisant pour cette action.\n");
      withDraw();
    } else {
      balance -= montant;
      System.out.println("\n  Retrait de " + montant + " ariary effectué avec succès. \n");
      Transaction.makeTransaction("retrait", montant);
      Menu.showMenu(getBalance());
    }
  }

  public static void deposit() {
    System.out.println("  Entrez le montant à déposer: ");
    Integer montant = Menu.input.nextInt();
    if (montant < 0) {
      System.out.println(
          "\n  Vous avez entré une valeur invalide. Veuillez entre une valeur supérieure à 0.\n");
      deposit();
    }
    balance += montant;
    System.out.println("\n  Dépôt de " + montant + " ariary effectué avec succès. \n");
    Transaction.makeTransaction("dépôt", montant);
    Menu.showMenu(getBalance());
  }
}
