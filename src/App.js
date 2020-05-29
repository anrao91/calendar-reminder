import React from "react";
import { Route, Switch } from "react-router-dom";

import Calendar from "./containers/Calendar";
import Month from "./containers/Month";

export default class App extends React.Component {
	render() {
		return (
			<Calendar>
				<Switch>
					<Route path="/:year/:month" component={Month} />
					<Route path="/" exact component={Month} />
				</Switch>
			</Calendar>
		);
	}
}
