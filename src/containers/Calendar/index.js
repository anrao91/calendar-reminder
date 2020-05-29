import React from "react";
import { Card } from "antd";

import "./index.css";

export default class Calendar extends React.Component {
	render() {
		return (
			<Card
				title={<span className="simple">{"Calendar Reminders"}</span>}
				className="calendar"
			>
				{this.props.children}
			</Card>
		);
	}
}
