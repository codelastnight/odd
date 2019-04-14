import React, { Component } from 'react'
import Button from './Button'
/**
 * props: {
 *      monthlyCost: Number,
 *      monthlyIncome: Number,
 *
 * }
 */
export default class Store extends Component {
	render() {
		return (
			<div className="store">
				<div className="grid">
					<div className="icon">
						<img />
					</div>
					<h1 className="Name">Name</h1>
					<div className="stats">a</div>
					<div className="Actions">
						<Button type="link">Delete Store</Button>
						<Button type="link">Upgrade</Button>
					</div>
					<div className="income">{this.props.monthlyIncome}</div>
					<div className="cost">{this.props.monthlyCost}</div>
				</div>
			</div>
		)
	}
}
