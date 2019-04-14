import React, { Component } from 'react'
import Button from './Button.js'
/**
 * props: {
 *      monthlyPayment: Number,
 * 		termLength: Number, // in months
 * 		startTime: Number, // month at which this loan was taken out
 * 		APR: Number, // annual percentage rate
 *      imgURL: String,
 * 		onPayLoan: function
 *
 * }
 */
export default class Loan extends Component {
	render() {
		return (
			<div
				className={'loan' + (this.props.prospective ? ' prospective' : '')}
				onClick={this.props.onClick}>
				<div className="loanImg">
					<img src={this.props.imgURL} alt="pee" />
				</div>
				<div className="info">
					<h3> {this.props.monthlyPayment}/mo</h3>
					<h4>
						{this.props.termLength}mos; APR: {this.props.APR}
					</h4>
					{this.props.prospective && <h4>${this.props.amount}</h4>}
				</div>
				{!this.props.prospective && (
					<div className="pay">
						<Button type="link" onClick={this.props.onPayLoan}>
							Pay Loan
						</Button>
					</div>
				)}
			</div>
		)
	}
}
