import React, { Component } from 'react'
import Store from './Store'
import Button from './Button'
/**
 * props: {
 *      stores: [Store],
 *      onNewStore: Function // passed into the new store button's onclick
 * }
 */
export default class StoreList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			openStore: -1
		}
	}

	render() {
		return (
			<div className="storeList">
				<h1>My Properties</h1>
				{this.props.stores.map((s, i) => (
					<Store
						monthlyCost={s.monthlyCost}
						monthlyIncome={s.monthlyIncome}
						open={this.state.openStore === i}
						toggleExpand={() => {
							if (this.state.openStore === i) {
								this.setState({ openStore: -1 })
							} else {
								this.setState({ openStore: i })
							}
						}}
					/>
				))}
				{!this.props.prospective && (
					<div className="newStore">
						<Button type="clear" onClick={this.props.onNewLoan}>
							+ new store
						</Button>
					</div>
				)}
			</div>
		)
	}
}
