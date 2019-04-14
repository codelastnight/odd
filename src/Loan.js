import React, { Component } from 'react'

/**
 * props: {
 *      monthlyPayment: Number,
 * 		termLength: Number, // in months
 * 		startTime: Number, // month at which this loan was taken out
 * 		minDue: Number, // what's due in the next payment
 * 		APR: Number, // annual percentage rate
 *      imgURL: String,
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
					<h3> {this.props.monthlyPayment} /month </h3>
					<h4>
						{this.props.termLength} APR: {this.props.APR}
					</h4>
				</div>
			</div>
		)
	}
}
