import React from "react";
import MonthHeader from "../../components/MonthHeader";
import DaysHeader from "../../components/DaysHeader";
import Day from "../../components/Day";
import moment from "moment";
import "./index.css";

export default class Month extends React.Component {
    state = {
        presentMonth: {},
        nextMonth: {},
        previousMonth: {}
    };

    componentDidMount() {
        this.createState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createState(nextProps, true);
    }

    createState(props) {
        const presentMonth =
            props.match.params.year && props.match.params.month
                ? `${props.match.params.year}-${props.match.params.month}`
                : moment().format("YYYY-MM");

        const oneMonth = moment.duration({ months: 1 });

        const nextMonth = moment(presentMonth)
            .add(oneMonth)
            .format("YYYY-MM");

        const previousMonth = moment(presentMonth)
            .subtract(oneMonth)
            .format("YYYY-MM");

        this.setState({
            presentMonth: {
                date: presentMonth,
                name: moment(presentMonth).format("MMMM YYYY"),
                days: moment(presentMonth).daysInMonth(),
                editDay: null
            },
            nextMonth: {
                date: nextMonth,
                slug: nextMonth.replace("-", "/")
            },
            previousMonth: {
                date: previousMonth,
                slug: previousMonth.replace("-", "/")
            }
        });
    }

    handleSetEditDay = day => {
        this.setState({
            presentMonth: {
                ...this.state.presentMonth,
                editDay: day
            }
        });
    };

    constructDays() {
        const days = [];
        const props = {
            editDay: this.state.presentMonth.editDay,
            handleSetEditDay: this.handleSetEditDay
        };
        const daysInAMonth =
            this.state.presentMonth.days &&
            [...Array(this.state.presentMonth.days + 1).keys()].slice(1);
        daysInAMonth &&
            daysInAMonth.map(index => {
                let date = `${this.state.presentMonth.date}-${(
                    "0" + index
                ).slice(-2)}`;
                props["date"] = date;
                props["day"] = index;

                if (index === 1) {
                    props["firstDayIndex"] = moment(date)
                        .startOf("month")
                        .format("d"); //day of the week i.e 1st July is 1st day of the week, 1st August is 4th day of the week, etc
                } else {
                    delete props["firstDayIndex"];
                }

                days.push(<Day key={index} {...props} />);
            });

        return days;
    }

    render() {
        const weekdays = moment.weekdays();
        const days = this.constructDays();

        return (
            <div className="month">
                <MonthHeader
                    presentMonth={this.state.presentMonth}
                    nextMonth={this.state.nextMonth}
                    previousMonth={this.state.previousMonth}
                />
                <DaysHeader days={weekdays} />
                <section className="days">{days}</section>
            </div>
        );
    }
}
