import readline from 'readline-sync';
import { showMenu } from './menu.js';

let cards = [];

function Card (number ,name, balance) {
    this.number = number;
    this.name = name;
    this.balance = balance;
}

export function handleCards() {
    const cardsMenu =  "\    Choisissez une action à faire: \n \     1. Ajouter une carte\n \     2. Retirer une carte\n \     3. Voir les cartes\n" 
    + "Votre choix: "; 
    const wrongChoice = "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n"
    const validChoice = [1, 2, 3]
    const choice = +readline.question(cardsMenu);
    if (!validChoice.includes(choice)){
        console.log(wrongChoice);
        showMenu();
    } else{
        switch (choice) {
            case 1:
                addCard();
            case 2:
                removeCard();
            case 3:
                listCards();
        }
    }
}

function addCard() {
    const number = readline.question("\    Veuillez entrer le numéro de votre carte: ");
    const name = readline.question("\    Veuillez entrer le nom de votre carte: ");
    const balance = +readline.question("\    Veuillez entrer le montant du solde de votre carte: ");
    if(balance < 0) {
    console.log("\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n");
    } else {
        cards.push(new Card(number, name, balance));
        console.log("\n  Carte ajoutée avec succès.\n")
        showMenu();
    }
}

function listCards() {
    console.table(cards);
    showMenu();
}

function removeCard() {
    const toRemove = readline.question("\n    Veuillez renseigner le numéro de carte à retirer: ");
    const isPresent = cards.some(card => card.number.toLowerCase() == toRemove.toLowerCase());
    if(!isPresent){
        console.log("\n    La carte spécifiée n'existe pas.");
        removeCard();
    } else{
        cards = cards.filter(card => card.number.toLowerCase() !== toRemove.toLowerCase());
        console.log("\n    Carte retirée avec succès.\n");
        showMenu();
    }
}