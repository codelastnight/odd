import React, { Component } from 'react'
import Button from './Button'
import Building from './images/level_1.png'
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
						<img src={Building} alt="building" />
					</div>
					<h1 className="Name">Name</h1>
					<div className="info">a</div>
					<div className="Actions">
						<Button type="link">Delete Store</Button>
						<Button type="link">Upgrade</Button>
					</div>
					<div className="stats">
						<div className="income">Income: +{this.props.monthlyIncome}</div>
						<div className="cost">Cost: -{this.props.monthlyCost}</div>
					</div>
				</div>
			</div>
		)
	}
}
