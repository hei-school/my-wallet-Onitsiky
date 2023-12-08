import readline from 'readline-sync'
import { showMenu } from './menu.js'
import { makeTransaction } from './transaction.js'

let balance = 0

export function getBalance () {
  return balance
}

export function withDraw () {
  const montant = +readline.question('Entrez le montant à retirer: ')

  if (montant <= 0) {
    console.log('\nLe montant de votre retrait devrait être une valeur positive, différente de 0.\n')
    withDraw()
  }

  if (balance < montant) {
    console.log('\nVotre solde actuel est insuffisant pour cette action.\n')
    withDraw()
  } else {
    balance -= montant
    console.log(`\nRetrait de ${montant} ariary effectué avec succès.\n`)
    makeTransaction('retrait', montant)
    showMenu()
  }
}

export function deposit () {
  const montant = +readline.question('Entrez le montant à déposer: ')

  if (montant <= 0) {
    console.log('\nVous avez entré une valeur invalide. Veuillez entrer une valeur supérieure à 0.\n')
    deposit()
  }

  balance += montant
  console.log(`\nDépôt de ${montant} ariary effectué avec succès.\n`)
  makeTransaction('dépôt', montant)
  showMenu()
}
