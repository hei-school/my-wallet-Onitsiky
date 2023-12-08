import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Transaction {
  private static final List<Transaction> transactions = new ArrayList<>();
  public String type;
  public Integer montant;
  public Instant date;

  public Transaction(String type, Integer montant, Instant date) {
    this.type = type;
    this.montant = montant;
    this.date = date;
  }

  public static void makeTransaction(String type, Integer montant) {
    transactions.add(new Transaction(type, montant, Instant.now()));
  }

  public static List<Transaction> getTransactions() {
    return transactions;
  }

  public static void handleTransactions() {
    String transactionMenu =
        "    Choisissez une action à faire: \n      1. Voir la liste des transactions\n  Votre choix: ";
    System.out.println(transactionMenu);
    Integer choice = Menu.input.nextInt();
    List<Integer> validChoice = List.of(1);
    if (!validChoice.contains(choice)) {
      System.out.println(Menu.invalidChoice);
      handleTransactions();
    } else {
      switch (choice) {
        case 1:
          System.out.println(getTransactions());
          Menu.showMenu(Cash.getBalance());
      }
    }
  }

  public String toString() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")
        .withZone(ZoneId.systemDefault());
    String formattedInstant = formatter.format(date.atZone(ZoneId.systemDefault()));
    return "Le " + formattedInstant + ", un " + type + " de " + montant + " ariary.";
  }
}
