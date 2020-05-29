import React from "react";
import { Icon } from "antd";

import "./index.css";

const reminder = props => (
	<article className="reminder" style={{ background: props.reminder.color }}>
		<div className="tools">
			<Icon
				type="delete"
				onClick={() => props.handleDeleteReminder(props.reminder.id)}
			/>

			<Icon
				type="edit"
				onClick={() => props.handleSetEdit(props.reminder)}
			/>
		</div>
		<strong>{props.reminder.description}</strong>
		<time>{props.reminder.time}</time>
	</article>
);

export default reminder;
