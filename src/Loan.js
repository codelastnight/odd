import React, { Component } from 'react'
import Button from './Button.js'
/**
 * props: {
 *      monthlyPayment: Number,
 * 		termLength: Number, // in months
 * 		startTime: Number, // month at which this loan was taken out
 * 		minDue: Number, // what's due in the next payment
 * 		APR: Number, // annual percentage rate
 *      imgURL: String,
 * 		onPayLoan: function
 *
 * }
 */
export default class Loan extends Component {
	render() {
		return (
			<div className="loan">
				<div className="loanImg">
					<img src={this.props.imgURL} alt="pee" />
				</div>
				<div className="info">
					<h3> {this.props.monthlyPayment}/mo</h3>
					<h4>
						{this.props.termLength} APR: {this.props.APR}
					</h4>
				</div>
				<div className="pay">
					<Button type="link" onClick={this.props.onPayLoan}>
						Pay Loan
					</Button>
				</div>
			</div>
		)
	}
}
