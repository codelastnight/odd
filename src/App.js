import React, { Component } from 'react'
import Button from './Button'
import Header from './Header'
import LoanList from './LoanList'
import Modal from 'react-modal'
import { getLoans } from './even'
import StoreList from './StoreList'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '0',
		borderWidth: '2px',
		borderColor: '#000',
		backgroundColor: '#fff'
	}
}

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

	return Number((amountOwed / d).toFixed(2))
}

const generateStoreOption = () => {
	// cost randomly between 5k and 20k
	// revenue randomly between 110% and 130% of the cost
	let cost = (Math.floor(Math.random() * 16) + 5) * 1000
	let revenue = Math.round(
		((Math.floor(Math.random() * 21) + 110) / 100) * cost
	)
	revenue = revenue - (revenue % 100)

	return { monthlyCost: cost, monthlyIncome: revenue }
}

const calculateCreditScore = creditReport => {
	let scorePercent = 0

	scorePercent +=
		0.4 * (1 / (1 + Math.E ** (-creditReport.onTimePayments / 16)))

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
			paymentDue: 2000, // payment due for THIS month
			loans: [
				/* { startTime, termLength, monthlyPayment, APR, imgURL } */
			],
			monthlyRevenue: 2100, // money that will be earned by NEXT month
			stores: [{ monthlyCost: 2000, monthlyIncome: 2100 }],
			creditReport: {
				onTimePayments: 0,
				missedPayments: 0,
				avgAge: 0, // loans.reduce((a, c) => a + (month - c.startTime), 0) / numberOfAccounts
				numberOfAccounts: 0 // loans.length
			},
			location: 0,
			month: 0, // time counter,
			storeOptions: Array.from({ length: 5 }, () => generateStoreOption()),
			loanOptions: [
				// { termLength, APR, imgURL }
			],
			isNewLoanModalOpen: false,
			isNewStoreModalOpen: false
		}
	}

	takeOutLoan = (APR, amountOwed, termLength, imgURL) => {
		let newLoans = this.state.loans.slice().concat({
			startTime: this.state.month,
			monthlyPayment: monthlyPaymentOfLoan(termLength, APR, amountOwed),
			termLength,
			APR,
			imgURL
		})

		this.setState({
			loans: newLoans,
			balance: this.state.balance + amountOwed,
			isNewLoanModalOpen: false
		})
	}

	buyStore = i => {
		// buys store indexed as i in the storeOptions array
		if (this.state.balance < this.state.storeOptions[i].monthlyCost) return

		let newPaymentDue =
			this.state.paymentDue + this.state.storeOptions[i].monthlyCost

		let newMonthlyRevenue =
			this.state.monthlyRevenue + this.state.storeOptions[i].monthlyIncome

		let newStoreOptions = this.state.storeOptions.slice()
		let newStores = this.state.stores
			.slice()
			.concat(newStoreOptions.splice(i, 1)[0])

		this.setState({
			paymentDue: newPaymentDue,
			storeOptions: newStoreOptions,
			monthlyRevenue: newMonthlyRevenue,
			stores: newStores,
			isNewStoreModalOpen: false
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

    let recession = Math.random() < (1 / 120)
    let 

		let newMonth = this.state.month + 1

		// generate 5 new store options
		let newStoreOptions = Array.from({ length: 5 }, () => generateStoreOption())

		// add monthlyRevenue to balance
		let revMult = Math.random() * 0.2 + 0.9
		console.log(revMult)
		let newBalance =
			this.state.balance -
			this.state.paymentDue +
			this.state.monthlyRevenue * revMult

		// update credit report
		let newCreditReport = this.state.creditReport

		// update loans (if they're done)
		let newLoans = this.state.loans.slice()

		for (let i = newLoans.length - 1; i >= 0; i--) {
			if (newMonth - newLoans[i].startTime >= newLoans[i].termLength) {
				newLoans.splice(i, 1)
			}
		}

		newLoans.forEach(l => {
			newCreditReport.onTimePayments++
		})

		// adjust paymentdue
		let newPaymentDue =
			this.state.stores.reduce((a, c) => a + c.monthlyCost, 0) +
			newLoans.reduce((a, c) => a + c.monthlyPayment, 0)

		// update credit report
		newCreditReport.numberOfAccounts = newLoans.length

		if (newCreditReport.numberOfAccounts === 0) newCreditReport.avgAge = 0
		else
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

	openNewLoanModal = async () => {
		let res = await getLoans(
			this.state.monthlyRevenue,
			calculateCreditScore(this.state.creditReport)
		)
		let { loanOffers } = await res.json()
		loanOffers = loanOffers.slice(0, 3)
		this.setState({ isNewLoanModalOpen: true, loanOptions: loanOffers })
	}

	closeNewLoanModal = () => {
		this.setState({ isNewLoanModalOpen: false })
	}

	openNewStoreModal = async () => {
		this.setState({ isNewStoreModalOpen: true })
	}

	closeNewStoreModal = () => {
		this.setState({ isNewStoreModalOpen: false })
	}

	render() {
		return (
			<div className="App">
				<Modal
					isOpen={this.state.isNewLoanModalOpen}
					onRequestClose={this.closeNewLoanModal}
					style={customStyles}
					contentLabel="New Loan">
					<h2>New Loan</h2>
					<LoanList
						onNewLoan={this.takeOutLoan}
						prospective={true}
						loans={this.state.loanOptions.map(l => {
							if (l.termUnit === 'year') {
								l.termLength *= 12
							} else if (l.termUnit === 'day') {
								l.termLength = Math.round(l.termLength / 30)
							}

							l.APR = l.meanApr
							l.monthlyPayment = monthlyPaymentOfLoan(
								l.termLength,
								l.APR,
								l.maxAmount
							)
							l.imgURL = 'https://' + l.originator.images[0].url

							return l
						})}
					/>
				</Modal>
				<Modal
					isOpen={this.state.isNewStoreModalOpen}
					onRequestClose={this.closeNewStoreModal}
					style={customStyles}
					contentLabel="New Store">
					<h2>New Store</h2>
					<StoreList
						onNewStore={this.buyStore}
						prospective={true}
						stores={this.state.storeOptions}
					/>
				</Modal>
				<Header
					creditScore={calculateCreditScore(this.state.creditReport)}
					balance={this.state.balance}
					paymentDue={this.state.paymentDue}
					totalRevenue={this.state.monthlyRevenue}
					month={this.state.month}
					onNextMonth={this.nextMonth}
				/>

				<LoanList loans={this.state.loans} onNewLoan={this.openNewLoanModal} />
				<StoreList
					stores={this.state.stores}
					onNewStore={this.openNewStoreModal}
				/>
			</div>
		)
	}
}

export default App
