import java.util.ArrayList;
import java.util.List;

public class Card {
  public String cardNumber;
  public String label;
  public Integer balance;

  public String getCardNumber() {
    return cardNumber;
  }

  public void setBalance(Integer balance) {
    this.balance = balance;
  }

  public Card(String cardNumber, String label, Integer balance) {
    this.cardNumber = cardNumber;
    this.label = label;
    this.balance = balance;
  }

  @Override
  public String toString() {
    return "Carte: {" +
        "nom: " + label + ", numero: " + cardNumber + ", solde: " + balance;
  }

  public static List<Card> cards = new ArrayList<>();

  public static List<Card> getCards() {
    return cards;
  }

  public static void handleCard(){
    String cardMenu = "    Choisissez une action à faire: \n      1. Ajouter une carte\n      2. Retirer une carte\n      3. Voir les cartes\n      4. Recharger une carte\n      5. Débiter une carte\n"
        + "Votre choix: ";
    List<Integer> validChoices = List.of(1,2,3,4,5);
    System.out.println(cardMenu);
    Integer choice = Menu.input.nextInt();
    if(!validChoices.contains(choice)) {
      System.out.println(Menu.invalidChoice);
      handleCard();
    } else {
      switch (choice){
        case 1:
          addCard();
        case 2:
          removeCard();
        case 3:
          listCard();
        case 4:
          refillCard();
        case 5:
          debitCard();
      }
    }
  }

  public static void addCard() {
    System.out.println("    Veuillez entrer le label de votre carte: ");
    String label = Menu.input.next();
    System.out.println("    Veuillez entrer le montant du solde de votre carte: ");
    int balance = Menu.input.nextInt();
    System.out.println("    Veuillez entrer le numéro de votre carte: ");
    String number = Menu.input.next();
    if(balance <= 0) {
      System.out.println("\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n");
      addCard();
    } else {
      cards.add(new Card(number, label, balance));
      System.out.println("\n  Carte ajoutée avec succès.\n");
      Menu.showMenu(Cash.getBalance());
    }
  }

  public static void removeCard() {
    System.out.println("\n    Veuillez renseigner le numéro de carte à retirer: ");
    String number = Menu.input.nextLine();
    if(!getCards().stream().anyMatch(card -> card.getCardNumber().equals(number))) {
      System.out.println("\n    La carte spécifiée n'existe pas.");
      removeCard();
    } else {
      cards = cards.stream().filter(card -> !card.getCardNumber().equals(number)).toList();
      System.out.println("\n    Carte retirée avec succès.\n");
      Menu.showMenu(Cash.getBalance());
    }
  }

  public static void listCard() {
    System.out.println(getCards());
    Menu.showMenu(Cash.getBalance());
  }

  public static void refillCard() {
    System.out.println("\n    Veuillez renseigner le numéro de votre carte: ");
    String number = Menu.input.next();
    if(!getCards().stream().anyMatch(card -> card.getCardNumber().equals(number))) {
      System.out.println("\n    La carte spécifiée n'existe pas.");
      removeCard();
    }
    System.out.println("    Veuillez entrer le montant à ajouter: ");
    Integer montant = Menu.input.nextInt();
    if(montant < 0 ) {
      System.out.println("\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n");
      refillCard();
    } else {
      cards = cards.stream().map(card -> {
        if(card.getCardNumber().equals(number)) {
          card.setBalance(card.balance + montant);
        }
        return card;
      }).toList();
      System.out.println("\n    Balance de la carte mise à jour avec succès.\n");
      Transaction.makeTransaction("recharge de la carte " + number, montant);
      Menu.showMenu(Cash.getBalance());
    }
  }

  public static void debitCard() {
    System.out.println("\n    Veuillez renseigner le numéro de votre carte: ");
    String number = Menu.input.next();
    if(!getCards().stream().anyMatch(card -> card.getCardNumber().equals(number))) {
      System.out.println("\n    La carte spécifiée n'existe pas.");
      debitCard();
    }
    System.out.println("    Veuillez entrer le montant à retirer: ");
    Integer montant = Menu.input.nextInt();
    if(montant < 0 ) {
      System.out.println("\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n");
      debitCard();
    } else {
      cards = cards.stream().map(card -> {
        if(card.getCardNumber().equals(number)) {
          card.setBalance(card.balance - montant);
        }
        return card;
      }).toList();
      System.out.println("\n    Montant de " + montant +" débitée avec succès.\n");
      Transaction.makeTransaction("retrait sur la carte " + number, montant);
      Menu.showMenu(Cash.getBalance());
    }
  }
}
