import React, { Component } from 'react'
import Button from './Button.js'
import Profile from './images/pfp1.png'
/**
 * props: {
 *      creditScore: Number,
 *      balance: Number,
 *      paymentDue: Number,
 *      totalRevenue: Number,
 *      month: Number,
 *      onNextMonth: Function // passed into next month button's onclick
 * }
 */

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
]

export default class Header extends Component {
	render() {
		return (
			<div className="header">
				<div className="profile">{/* <img src={Profile} alt="pee" /> */}</div>
				<div className="info">
					<h1 className="name">Stevejobert B. JR IV </h1>
					<div className="stats">
						<h3>Credit Score: {this.props.creditScore}</h3>
						<h3>Current Balance: {this.props.balance.toFixed(2)}</h3>
						<h3>Payment Due: {this.props.paymentDue.toFixed(2)}</h3>
						<h3>Total Revenue: ~{this.props.totalRevenue.toFixed(2)}</h3>
					</div>
				</div>
				<div className="month">
					<h3>Year {Math.floor(this.props.month / 12) + 2019}</h3>
					<p>{monthNames[this.props.month % 12]}</p>
				</div>
				<div className="next">
					<Button type="fill" onClick={this.props.onNextMonth}>
						Next Month
					</Button>
				</div>
			</div>
		)
	}
}
