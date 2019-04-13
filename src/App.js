import React, { Component } from 'react'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: 'John Doe',
			balance: 10000, // in dollars, random between 5k and 15k, normal
			paymentDue: 0,
			loans: [
				/* { APR, amountOwed, startTime, minDue } */
			],
			monthlyRevenue: 0,
			stores: [
				/* { monthlyRent, monthyIncome } */
			],
			creditReport: {
				onTimePayments: 0,
				missedPayments: 0,
				avgAge: 0, // loans.reduce((a, c) => a + (month - c.startTime), 0) / numberOfAccounts
				numberOfAccounts: 0 // loans.length
			},
			month: 0 // time counter
		}
	}

	render() {
		return <div className="App" />
	}
}

export default App
