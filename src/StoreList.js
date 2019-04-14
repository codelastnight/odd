import React, { Component } from 'react'
import Store from './Store'

/**
 * props: {
 *      stores: [Store],
 *      onNewStore: Function // passed into the new store button's onclick
 * }
 */
export default class StoreList extends Component {
	render() {
		return (
			<div className="store-list">
				{this.props.store.map(s => (
					<Store monthlyCost={s.monthlyCost} monthlyIncome={s.monthlyIncome} />
				))}
			</div>
		)
	}
}
