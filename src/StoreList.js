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
				{!this.props.prospective && <h1>My Properties</h1>}
				<div className="Contain">
					{this.props.stores.map((s, i) => (
						<Store
							index={i + 1}
							prospective={this.props.prospective}
							monthlyCost={s.monthlyCost}
							down={s.down}
							close={() => this.props.closeStore(i)}
							monthlyIncome={s.monthlyIncome}
							open={this.state.openStore === i}
							toggleExpand={() => {
								if (this.props.prospective) {
									this.props.onNewStore(i)
								} else {
									if (this.state.openStore === i) {
										this.setState({ openStore: -1 })
									} else {
										this.setState({ openStore: i })
									}
								}
							}}
						/>
					))}
				</div>
				{!this.props.prospective && (
					<div className="newStore">
						<Button type="clear" onClick={this.props.onNewStore}>
							+ new store
						</Button>
					</div>
				)}
			</div>
		)
	}
}
