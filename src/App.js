import React, { Component } from 'react'
import Button from './Button'
import Header from './Header'

const getRandomZipCode = location => {
	switch (location) {
		case 2:
			return ['98101', '02210', '94102', '11215', '30313'][
				Math.floor(Math.random() * 5)
			]
		case 1:
			return ['98006', '02030', '94010', '07102', '30306'][
				Math.floor(Math.random() * 5)
			]
		default:
			return ['98844', '02072', '94074', '07083', '30315'][
				Math.floor(Math.random() * 5)
			]
	}
}

const monthlyPaymentOfLoan = (termLength, APR, amountOwed) => {
	let n = termLength
	let i = APR / 100 / 12
	let d = ((i + 1) ** n - 1) / (i * (i + 1) ** n)

	return amountOwed / d
}

const generateStoreOption = () => {
	// cost randomly between 5k and 20k
	// revenue randomly between 110% and 130% of the cost
	let cost = (Math.floor(Math.random() * 16) + 5) * 1000
	let revenue = Math.round(
		((Math.floor(Math.random() * 21) + 110) / 100) * cost
	)
	revenue = revenue - (revenue % 100)

	return { monthlyCost: cost, monthlyRevenue: revenue }
}

const calculateCreditScore = creditReport => {
	let scorePercent = 0

	// payment history is 40% of the credit score
	if (creditReport.onTimePayments === 0 && creditReport.missedPayments === 0)
		scorePercent += 0.15
	else
		scorePercent +=
			0.4 *
			(creditReport.onTimePayments /
				(creditReport.missedPayments + creditReport.onTimePayments)) **
				4

	// average age of accounts is 40% of credit score
	scorePercent += 0.4 * (2 / (1 + Math.E ** (-creditReport.avgAge / 12)) - 1)

	// account diversity (number of accounts is 20% of credit score)
	scorePercent +=
		0.2 * (2 / (1 + Math.E ** (-creditReport.numberOfAccounts / 2)) - 1)

	// real credit scores range form 300 to 850
	return Math.floor(scorePercent * 551) + 300
}

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: 'John Doe',
			balance: (Math.floor(Math.random() * 11) + 5) * 1000, // in dollars, random between 5k and 15k
			paymentDue: 0,
			loans: [
				/* { startTime, termLength, monthlyPayment, minDue, APR } */
			],
			monthlyRevenue: 0,
			stores: [{ monthlyCost: 2000, monthlyIncome: 8000 }],
			creditReport: {
				onTimePayments: 0,
				missedPayments: 0,
				avgAge: 0, // loans.reduce((a, c) => a + (month - c.startTime), 0) / numberOfAccounts
				numberOfAccounts: 0 // loans.length
			},
			location: 0,
			month: 0, // time counter,
			storeOptions: [
				/* { monthlyCost, monthlyIncome } */
			]
		}
	}

	takeOutLoan = (APR, amountOwed, termLength) => {
		let newLoans = this.state.loans.slice().concat({
			startTime: this.state.month,
			monthlyPayment: monthlyPaymentOfLoan(termLength, APR, amountOwed),
			minDue: monthlyPaymentOfLoan(termLength, APR, amountOwed),
			termLength,
			APR
		})

		this.setState({ loans: newLoans, balance: this.state.balance + amountOwed })
	}

	buyStore = i => {
		// buys store indexed as i in the storeOptions array
		if (this.state.balance < this.state.storeOptions[i].monthlyCost) return

		let newBalance = this.state.balance - this.state.storeOptions[i].monthlyCost

		let newStoreOptions = this.state.storeOptions.slice()
		let newStores = this.state.stores
			.slice()
			.concat(newStoreOptions.splice(i, 1)[0])

		this.setState({
			balance: newBalance,
			storeOptions: newStoreOptions,
			stores: newStores
		})
	}

	closeStore = i => {
		// closes store indexed as i in the stores array
		let newStores = this.state.stores.slice()
		let removedStore = newStores.splice(i, 1)[0]

		let newMonthlyRevenue =
			this.state.monthlyRevenue - removedStore.monthlyIncome

		this.setState({ stores: newStores, monthlyRevenue: newMonthlyRevenue })
	}

	nextMonth = () => {
		let newMonth = this.state.month + 1

		// generate 5 new store options
		let newStoreOptions = Array.from({ length: 5 }, () => generateStoreOption())

		// add monthlyRevenue to balance
		let newBalance = this.state.balance + this.state.monthlyRevenue

		// update credit report
		let newCreditReport = this.state.creditReport

		// update loans (if they're done)
		let newLoans = this.state.loans.slice()

		for (let i = newLoans.length - 1; i >= 0; i--) {
			if (
				newMonth - newLoans[i].startTime >= newLoans[i].termLength &&
				newLoans[i].minDue === 0
			) {
				newLoans.splice(i, 1)
			}
		}

		newLoans.forEach(l => {
			if (l.minDue > 0) newCreditReport.missedPayments++
			else newCreditReport.onTimePayments++

			l.minDue += l.monthlyPayment
		})

		// adjust paymentdue
		let newPaymentDue =
			this.state.stores.reduce((a, c) => a + c.monthlyCost, 0) +
			newLoans.reduce((a, c) => a + c.minDue, 0)

		// update credit report
		newCreditReport.numberOfAccounts = newLoans.length
		newCreditReport.avgAge =
			newLoans.reduce((a, c) => a + (newMonth - c.startTime), 0) /
			newCreditReport.numberOfAccounts

		this.setState({
			month: newMonth,
			storeOptions: newStoreOptions,
			balance: newBalance,
			creditReport: newCreditReport,
			loans: newLoans,
			paymentDue: newPaymentDue
		})
	}

	render() {
		return (
			<div className="App">
				<Header
					creditScore={700}
					balance={7000}
					paymentDue={600}
					totalRevenue={600}
					month={6}
				/>
				{/* <Button type="meme" onClick={}>text</Button> */}
			</div>
		)
	}
}

export default App
