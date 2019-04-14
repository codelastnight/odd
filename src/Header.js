import React, { Component } from 'react'

/**
 * props: {
 *      creditScore: Number,
 *      balance: Number,
 *      paymentDue: Number,
 *      totalRevenue: Number,
 *      month: Number,
 *      onNextMonth: Function // passed into next month button's onclick
 * }
 */
export default class Header extends Component {
	render() {
		return <div className="header" />
	}
}
