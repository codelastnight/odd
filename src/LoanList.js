import React, { Component } from 'react'
import Loan from './Loan'
import Button from './Button.js'
/**
 * props: {
 *      loans: [Loan],
 *      onNewLoan: Function // passed into the new loan button's onclick
 * }
 */
export default class LoanList extends Component {
	render() {
		return (
			<div className="loanList">
				{this.props.loans.map(l => {
					return (
						<Loan
							monthlyPayment={l.monthlyPayment}
							termLength={l.termLength}
							startTime={l.startTime}
							minDue={l.minDue}
							APR={l.APR}
							imgURL={l.imgURL}
						/>
					)
				})}
				<Button type="clear" onClick={this.props.onPayLoan}>
					+ new loan
				</Button>
			</div>
		)
	}
}
