import React, { Component } from 'react'
import Loan from './Loan'

/**
 * props: {
 *      loans: [Loan],
 *      onNewLoan: Function // passed into the new loan button's onclick
 * }
 */
export default class LoanList extends Component {
	render() {
		return (
			<div className="loan-list">
				{this.props.loans.map(l => {
					return (
						<Loan
							monthlyPayment={l.monthlyPayment}
							termLength={l.termLength}
							startTime={l.startTime}
							minDue={l.minDue}
							APR={l.APR}
							imgURL={''}
						/>
					)
				})}
			</div>
		)
	}
}
