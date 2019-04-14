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
					<h1 className="Name">Store {this.props.index}</h1>
					<div className="info">a</div>
					<div className="Actions">
						<Button onClick={this.props.close} type="link">
							Close Store
						</Button>
						<Button type="link">Upgrade</Button>
					</div>
					<div className="stats">
						<div className="income">
							<b>Income:</b> ~{this.props.monthlyIncome}
						</div>
						<div className="cost">
							<b>Cost:</b> {this.props.monthlyCost}
						</div>
						<div className="cost">
							<b>Down:</b> {this.props.down}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
