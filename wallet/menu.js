import readline from 'readline-sync';
import { deposit, getBalance, withDraw } from './cash.js';

export function showMenu() {
    const menu = `\n  Bienvenue sur My Wallet, votre application de gestion de porte-feuilles.\n    Votre solde actuel est de ${getBalance()} ariary.\n`+
    "\    Choisissez une action à faire: \n \     1. Déposer de l'argent\n \     2. Retirer de l'argent \n Votre choix: "; 

    const wrongChoice = "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n"

    const validChoice = [1, 2]

    const choice = +readline.question(menu);

    if (!validChoice.includes(choice)){
        console.log(wrongChoice);
        showMenu();
    } else {
        switch(choice) {
            case 1:
                deposit();
            case 2:
                withDraw();
        }        
    }
}

showMenu();
