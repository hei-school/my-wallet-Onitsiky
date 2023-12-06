import readline from 'readline-sync';
import { showMenu } from './menu.js';
import { makeTransaction } from './transaction.js';

let cards = [];

function Card (number ,name, balance) {
    this.number = number;
    this.name = name;
    this.balance = balance;
}

export function handleCards() {
    const cardsMenu =  "\    Choisissez une action à faire: \n \     1. Ajouter une carte\n \     2. Retirer une carte\n \     3. Voir les cartes\n \     4. Recharger une carte\n      5. Débiter une carte\n" 
    + "Votre choix: "; 
    const wrongChoice = "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n"
    const validChoice = [1, 2, 3, 4, 5]
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
            case 4:
                refillCard();
            case 5:
                debitCard();
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

function refillCard() {
    const number = readline.question("\    Veuillez entrer le numéro de votre carte: ");
    const isPresent = cards.some(card => card.number.toLowerCase() == number.toLowerCase());
    if(!isPresent){
        console.log("\n    La carte spécifiée n'existe pas.");
        refillCard();
    }
    const montant = +readline.question("\    Veuillez entrer le montant à ajouter: ");
    if(montant < 0) {
        console.log("\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n");
        refillCard();
    } else{
        cards = cards.map(card => {
            if(card.number.toLowerCase() == number.toLowerCase()){
                return {...card, balance: card.balance + montant}
            }
            return card;
        })
        console.log("\n    Balance de la carte mise à jour avec succès.\n");
        makeTransaction(`recharge sur la carte ${number}`, montant);
        showMenu();
    }

}

function debitCard() {
    const number = readline.question("\    Veuillez entrer le numéro de votre carte: ");
    const isPresent = cards.some(card => card.number.toLowerCase() == number.toLowerCase());
    if(!isPresent){
        console.log("\n    La carte spécifiée n'existe pas.");
        debitCard();
    }
    const montant = +readline.question("\    Veuillez entrer le montant à débiter: ");
    if(montant < 0) {
        console.log("\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n");
        debitCard();
    } else {
        cards = cards.map(card => {
            if(card.number.toLowerCase() == number.toLowerCase()){
                return {...card, balance: card.balance - montant}
            }
            return card;
        })
        console.log(`\n    Montant de ${montant} débitée avec succès.\n`);
        makeTransaction(`retrait sur la carte ${number}`, montant);
        showMenu();
    }
}