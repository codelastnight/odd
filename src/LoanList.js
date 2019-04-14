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
			<div
				className={'loanList' + (this.props.prospective ? ' prospective' : '')}>
				{!this.props.prospective && <h1>Current Loans</h1>}
				<div className="Contain">
					{this.props.loans.map((l, i) => {
						return (
							<Loan
								prospective={this.props.prospective}
								monthlyPayment={l.monthlyPayment}
								termLength={l.termLength}
								APR={l.APR}
								imgURL={l.imgURL}
								amount={l.maxAmount}
								onClick={() => {
									this.props.onNewLoan(
										l.APR,
										l.maxAmount,
										l.termLength,
										l.imgURL
									)
								}}
							/>
						)
					})}
				</div>

				{!this.props.prospective && (
					<div className="newLoan">
						<Button type="clear" onClick={this.props.onNewLoan}>
							+ new loan
						</Button>
					</div>
				)}
			</div>
		)
	}
}
