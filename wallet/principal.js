const readline = require("readline-sync");

let balance = 0;

const menu = "\  Bienvenue sur My Wallet, votre application de gestion de porte-feuilles.\n    Votre solde actuel est de " + balance + " Ariary.\n" +
"\    Choisissez une action à faire: \n \     1. Déposer de l'argent\n \     2. Retirer de l'argent \n Votre choix: "; 

const validChoice = ["1", "2"]

const wrongChoice = "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionné dans le menu.\n"

function showMenu() {
    const choice = readline.question(menu)
    if (!validChoice.includes(choice)){
        console.log(wrongChoice);
        showMenu();
    }
}

showMenu()
