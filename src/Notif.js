import React, { Component } from 'react'

export default class Notif extends Component {
	render() {
		return (
			<div className="notifBox">
				<h3>{this.props.text}</h3>
				<p>{this.props.subtext}</p>
			</div>
		)
	}
}
