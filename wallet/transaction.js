import readline from 'readline-sync'
import { showMenu } from './menu.js'

const transactions = []

export function makeTransaction (transactionType, montant) {
  transactions.push(`${getCurrentDateTime()}, un ${transactionType} de ${montant} ariary.`)
}

export function getTransactions () {
  return transactions
}

function getCurrentDateTime () {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1 // Months are zero-based
  const day = currentDate.getDate()
  const hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  return `Le ${day}/${month}/${year} à ${hours}:${minutes}`
}

export function handleTransactions () {
  const transactionMenu = `
    Choisissez une action à faire:
     1. Voir la liste des transactions

Votre choix: `

  const wrongChoice = '\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n'
  const validChoice = [1]
  const choice = +readline.question(transactionMenu)

  if (!validChoice.includes(choice)) {
    console.log(wrongChoice)
    showMenu()
  } else {
    switch (choice) {
      case 1:
        console.table(getTransactions())
        showMenu()
        break
      default:
        console.log('Choix invalide.')
        break
    }
  }
}
