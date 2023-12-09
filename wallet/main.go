package main

import (
	"fmt"
	"strconv"
	"time"
)

/*  Cash actions  */

var balance int

func getBalance() int {
	return balance
}

func Deposit() {
	var amount int
	fmt.Print("Entrez le montant à déposer: ")
	fmt.Scanln(&amount)

	if amount <= 0 {
		fmt.Println("\nVous avez entré une valeur invalide. Veuillez entrer une valeur supérieure à 0.\n")
		Deposit()
	} else {
		balance += amount
		fmt.Printf("\nDépôt de %d ariary effectué avec succès.\n", amount)
		// makeTransactions("depot", amount)
		ShowMenu()
	}
}

func Withdraw() {
	var amount int
	fmt.Print("Entrez le montant à retirer: ")
	fmt.Scanln(&amount)

	if amount <= 0 {
		fmt.Println("\nVous avez entré une valeur invalide. Veuillez entrer une valeur supérieure à 0.\n")
		Withdraw()
	} else if balance < amount {
		fmt.Println("\nVotre solde actuel est insuffisant pour cette action.\n")
		ShowMenu()
	} else {
		balance -= amount
		fmt.Printf("\nRetrait de %d ariary effectué avec succès.\n", amount)
		// makeTransactions("retrait", amount)
		ShowMenu()
	}
}

/*  Cash actions  */

/*  Transaction actions  */

var transactions []Transaction

type Transaction struct {
	Type   string
	Amount int
	Date   time.Time
}

func NewTransaction(transactionType string, amount int) Transaction {
	return Transaction{
		Type:   transactionType,
		Amount: amount,
		Date:   time.Now(),
	}
}

func (t Transaction) DisplayTransaction() {
	fmt.Printf("%s, un %s de %d ariary.\n", t.Date, t.Type, t.Amount)
}

func MakeTransactions(transactionType string, amount int) {
	transactions = append(transactions, NewTransaction(transactionType, amount))
	fmt.Println(transactions)
}

func GetTransactions() []Transaction {
	return transactions
}

func HandleTransaction() {
	transactionMenu := "    Choisissez une action à faire: \n     1. Voir la liste des transactions\n Votre choix: "
	wrongChoice := "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n"
	validChoices := []int{1}

	var choice int
	fmt.Print(transactionMenu)
	fmt.Scanln(&choice)

	if !contains(validChoices, choice) {
		fmt.Println(wrongChoice)
		HandleTransaction()
	} else {
		switch choice {
		case 1:
			for _, item := range transactions {
				item.DisplayTransaction()
				fmt.Println()
			}
			ShowMenu()
		}
	}
}

func contains(slice []int, item int) bool {
	for _, value := range slice {
		if value == item {
			return true
		}
	}
	return false
}

/*  Transaction actions  */

/*  Card actions  */

var cards []Card

type Card struct {
	Number  string
	Name    string
	Balance int
}

func (c Card) DisplayCard() {
	fmt.Printf("La carte %s, ayant le numéro %s a actuellement en solde: %d ariary.\n", c.Name, c.Number, c.Balance)
}

func HandleCards() {
	cardMenu := "    Choisissez une action à faire: \n      1. Ajouter une carte\n      2. Retirer une carte\n      3. Voir les cartes\n      4. Recharger une carte\n      5. Débiter une carte\n Votre choix: "
	wrongChoice := "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n"
	validChoices := []int{1, 2, 3, 4, 5}

	var choice int
	fmt.Print(cardMenu)
	fmt.Scanln(&choice)

	if !contains(validChoices, choice) {
		fmt.Println(wrongChoice)
		HandleCards()
	} else {
		switch choice {
		case 1:
			AddCard()
		case 2:
			RemoveCard()
		case 3:
			ListCards()
		case 4:
			RefillCard()
		case 5:
			DebitCard()
		}
	}
}

func AddCard() {
	var number, name string
	var balance int

	fmt.Print("    Veuillez entrer le numéro de votre carte: ")
	fmt.Scanln(&number)

	fmt.Print("    Veuillez entrer le nom de votre carte: ")
	fmt.Scanln(&name)

	fmt.Print("    Veuillez entrer le montant du solde de votre carte: ")
	fmt.Scanln(&balance)

	if balance < 0 {
		fmt.Println("\n  Le montant de votre retrait devrait-ếtre une valeur positive, différente de 0.\n")
		AddCard()
	} else {
		cards = append(cards, Card{Number: number, Name: name, Balance: balance})
		fmt.Println("\n  Carte ajoutée avec succès.\n")
		ShowMenu()
	}
}

func RemoveCard() {
	var toRemove string
	fmt.Print("\n    Veuillez renseigner le numéro de carte à retirer: ")
	fmt.Scanln(&toRemove)

	exists := false
	for _, item := range cards {
		if item.Number == toRemove {
			exists = true
			break
		}
	}

	if !exists {
		fmt.Println("\n    La carte spécifiée n'existe pas.")
		RemoveCard()
	} else {
		var updatedCards []Card
		for _, card := range cards {
			if card.Number != toRemove {
				updatedCards = append(updatedCards, card)
			}
		}
		cards = updatedCards
		fmt.Println("\n    Carte retirée avec succès.\n")
		ShowMenu()
	}
}

func ListCards() {
	for _, item := range cards {
		item.DisplayCard()
		fmt.Println()
	}
	ShowMenu()
}

func RefillCard() {
	var number string
	fmt.Print("    Veuillez entrer le numéro de votre carte: ")
	fmt.Scanln(&number)

	exists := false
	for _, item := range cards {
		if item.Number == number {
			exists = true
			break
		}
	}

	if !exists {
		fmt.Println("\n    La carte spécifiée n'existe pas.")
		RefillCard()
	} else {
		var amount int
		fmt.Print("    Veuillez entrer le montant à ajouter: ")
		fmt.Scanln(&amount)

		if amount < 0 {
			fmt.Println("\n  Vous avez entré une valeur invalide. Veuillez entrer une valeur supérieure à 0.\n")
			RefillCard()
		} else {
			var updatedCards []Card
			for _, card := range cards {
				if card.Number == number {
					card.Balance += amount
				}
				updatedCards = append(updatedCards, card)
			}
			cards = updatedCards
			fmt.Println("\n    Balance de la carte mise à jour avec succès.\n")
			MakeTransactions(fmt.Sprintf("recharge sur la carte %s", number), amount)
			ShowMenu()
		}
	}
}

func getIndex(cardNumber string) int {
	for i, card := range cards {
		if card.Number == cardNumber {
			return i
		}
	}
	return -1
}

func DebitCard() {
	var number string
	fmt.Print("    Veuillez entrer le numéro de votre carte: ")
	fmt.Scanln(&number)

	exists := false
	for _, item := range cards {
		if item.Number == number {
			exists = true
			break
		}
	}

	if !exists {
		fmt.Println("\n    La carte spécifiée n'existe pas.")
		DebitCard()
	} else {
		var amount int
		fmt.Print("\n    Veuillez entrer le montant à débiter: ")
		fmt.Scanln(&amount)

		if amount < 0 {
			fmt.Println("\n  Vous avez entré une valeur invalide. Veuillez entrer une valeur supérieure à 0.\n")
			RefillCard()
		} else if amount > cards[getIndex(number)].Balance {
			fmt.Println("\n  Le montant du débit est supérieur au solde de la carte.\n")
			ShowMenu()
		} else {
			for _, card := range cards {
				if card.Number == number {
					card.Balance -= amount
				}
			}
			ShowMenu()
		}
	}
}

/*  Card actions  */

func ShowMenu() {
	menu := fmt.Sprintf("\n  Bienvenue sur My Wallet, votre application de gestion de porte-feuilles.\n"+
		"     Votre solde actuel est de %d ariary.\n"+
		"     Choisissez une action à faire: \n"+
		"      1. Déposer de l'argent\n"+
		"      2. Retirer de l'argent \n"+
		"      3. Gérer les transactions \n"+
		"      4. Gérer les cartes \n"+
		"      5. Quitter l'application \nVotre choix: ", getBalance())

	wrongChoice := "\n Choix invalide. Veuillez choisir un choix parmi ceux mentionnés dans le menu.\n"
	validChoices := map[int]bool{1: true, 2: true, 3: true, 4: true, 5: true}

	var choice int
	var input string

	fmt.Print(menu)
	fmt.Scanln(&input)

	if parsedChoice, err := strconv.Atoi(input); err == nil {
		choice = parsedChoice
	} else {
		fmt.Println("Choix invalide. Veuillez entrer un nombre.")
		return
	}

	if _, validChoice := validChoices[choice]; !validChoice {
		fmt.Println(wrongChoice)
		ShowMenu()
	} else {
		switch choice {
		case 1:
			Deposit()
		case 2:
			Withdraw()
		case 3:
			HandleTransaction()
		case 4:
			HandleCards()
		case 5:
			fmt.Println("Merci de votre confiance, à la prochaine !")
		}
	}
}

func main() {
	ShowMenu()
}
