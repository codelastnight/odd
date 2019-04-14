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
	render() {
		return (
			<div className="storeList">
				<h1>My Properties</h1>
				{this.props.stores.map(s => (
					<Store monthlyCost={s.monthlyCost} monthlyIncome={s.monthlyIncome} />
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
