import React, { Component } from 'react'
import Button from './Button'
import Level1 from './images/level_1.png'
import Level2 from './images/level_2.png'
import Level3 from './images/level_3.png'
/**
 * props: {
 *      monthlyCost: Number,
 *      monthlyIncome: Number,
 *
 * }
 */
export default class Store extends Component {
	render() {
		let image = (c => {
			if (c < 10000) return Level1
			if (c < 15000) return Level2
			return Level3
		})(this.props.monthlyCost)
		return (
			<div
				className={
					'store' +
					(this.props.open && !this.props.prospective ? ' expand' : '')
				}
				onClick={this.props.toggleExpand}>
				<div className="grid">
					<div className="icon">
						<img src={image} alt="building" />
					</div>
					<h1 className="Name">Name</h1>
					<div className="info">a</div>
					<div className="Actions">
						<Button type="link">Delete Store</Button>
						<Button type="link">Upgrade</Button>
					</div>
					<div className="stats">
						<div className="income">Income: ~{this.props.monthlyIncome}</div>
						<div className="cost">Cost: {this.props.monthlyCost}</div>
						<div className="cost">Down: {this.props.down}</div>
					</div>
				</div>
			</div>
		)
	}
}
