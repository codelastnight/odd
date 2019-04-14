import React, { Component } from 'react'
import Notif from './Notif'

/**
 * props: {
 *      notifs: [Notif]
 * }
 */
export default class NotifList extends Component {
	render() {
		return (
			<div className={'notifList'}>
				<h1>Notifications</h1>
				{this.props.notifs.map((n, i) => {
					return <Notif text={n.text} />
				})}
			</div>
		)
	}
}
