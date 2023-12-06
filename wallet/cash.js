import readline from 'readline-sync';
import { showMenu } from './menu.js';
import { makeTransaction } from './transaction.js';

let balance = 0;

export function getBalance() {
    return balance;
}

export function withDraw() {
    const montant = +readline.question("\  Entrez le montant à retirer: ")
    if(montant <= 0) {
        console.log("\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n");
        withDraw();
    }
    if(balance < montant) {
        console.log("\n  Votre solde actuel est insuffisant pour cette action.\n");
        withDraw();
    } else {
        balance -= montant
        console.log(`\n  Retrait de ${montant} ariary effectué avec succès. \n`)
        makeTransaction("retrait", montant)
        showMenu();
    }
}

export function deposit() {
    const montant = +readline.question("\  Entrez le montant à déposer: ")
    if(montant <= 0) {
        console.log("\n  Vous avez entré une valeur invalide. Veuiller entre une valeur supérieure à 0.\n");
        deposit();
    }
    balance += montant;
    console.log(`\n  Dépôt de ${montant} ariary effectué avec succès. \n`)
    makeTransaction("dépôt", montant)
    showMenu();
}