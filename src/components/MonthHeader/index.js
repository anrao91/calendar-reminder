import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";

import "./index.css";

const headerMonth = props => {
	const presentDate =
		props.presentMonth &&
		props.presentMonth.name &&
		props.presentMonth.name.split(" ");
	const displayMonth =
		presentDate && presentDate.length > 0 ? presentDate[0] : "";
	const displayYear =
		presentDate && presentDate.length > 0 ? presentDate[1] : "";

	return (
		<header className="month-header">
			<div className="row">
				<Link to={"/" + props.previousMonth.slug}>
					<Icon
						type="left-square"
						theme="filled"
						style={{
							color: "black",
							backgroundColor: "white",
							fontSize: "2rem"
						}}
					/>
				</Link>
			</div>
			<div className="row">
				<h1>
					<strong>{displayMonth}</strong> &nbsp;
					<span style={{ fontWeight: "250" }}>{displayYear}</span>
				</h1>
			</div>
			<div className="row">
				<Link to={"/" + props.nextMonth.slug}>
					<Icon
						type="right-square"
						theme="filled"
						style={{
							color: "black",
							backgroundColor: "white",
							fontSize: "2rem"
						}}
					/>
				</Link>
			</div>
		</header>
	);
};

export default headerMonth;
