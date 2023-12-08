import readline from 'readline-sync'
import { deposit, getBalance, withDraw } from './cash.js'
import { handleTransactions } from './transaction.js'
import { handleCards } from './card.js'

export function showMenu () {
  const menu = `
  Bienvenue sur My Wallet, votre application de gestion de porte-feuilles.
  Votre solde actuel est de ${getBalance()} ariary.
  Choisissez une action à faire:
    1. Déposer de l'argent
    2. Retirer de l'argent
    3. Gérer les transactions
    4. Gérer les cartes
    5. Quitter l'application

Votre choix: `

  const wrongChoice = '\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n'

  const validChoice = [1, 2, 3, 4, 5]

  const choice = +readline.question(menu)

  if (!validChoice.includes(choice)) {
    console.log(wrongChoice)
    showMenu()
  } else {
    switch (choice) {
      case 1:
        deposit()
        break
      case 2:
        withDraw()
        break
      case 3:
        handleTransactions()
        break
      case 4:
        handleCards()
        break
      case 5:
        console.log('Merci de votre confiance, à la prochaine !')
        break
      default:
        console.log('Choix invalide.')
        break
    }
  }
}
