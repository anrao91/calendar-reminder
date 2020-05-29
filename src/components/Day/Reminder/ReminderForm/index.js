import React from "react";
import TimePicker from "rc-time-picker";
import ColorPicker from "rc-color-picker";
import moment from "moment";
import { Input, Button } from "antd";

import "rc-time-picker/assets/index.css";
import "rc-color-picker/assets/index.css";
import "./index.css";

const { TextArea } = Input;

const reminderForm = props => {
	const time = props.reminder.time
		? moment(props.reminder.time, "HH:mm a")
		: moment()
				.hour(0)
				.minute(0);

	return (
		<form
			method="post"
			onSubmit={event =>
				props.handleCreateUpdateReminder(event, props.reminder)
			}
		>
			<TextArea
				className="description"
				placeholder="Remind me to.."
				autosize={{ minRows: 1, maxRows: 2 }}
				defaultValue={props.reminder.description}
			/>
			<div className="rc-picker-wrapper">
				<TimePicker
					showSecond={false}
					defaultValue={time}
					format="h:mm a"
					use12Hours
					inputReadOnly
				/>

				<ColorPicker
					className="color-picker"
					animation="slide-up"
					color={props.reminder.color || props.defaultColor}
					onClose={props.handleSetColor}
				/>
			</div>

			<Button type="primary" htmlType="submit" className="btn-submit">
				Submit
			</Button>

			<Button
				className="btn-cancel"
				onClick={() => props.handleSetEditDay(null)}
			>
				Cancel
			</Button>
		</form>
	);
};

export default reminderForm;
