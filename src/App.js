import React, { Component } from 'react'

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

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: 'John Doe',
			balance: (Math.floor(Math.random() * 11) + 5) * 1000, // in dollars, random between 5k and 15k
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
			location: 0,
			month: 0 // time counter
		}
	}

	getLoans = () => {
		// call even api
	}

	takeOutLoan = () => {}

	buyStore = () => {}

	sellStore = i => {}

	nextMonth = () => {}

	render() {
		return <div className="App" />
	}
}

export default App
