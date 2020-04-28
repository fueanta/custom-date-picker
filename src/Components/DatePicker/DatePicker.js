import React, { Component } from "react";
import classes from "./DatePicker.module.css";
import Day from "./Day/Day";

class DatePicker extends Component {
    constructor(props) {
        super(props);
        const initialDate = this.props.date ? this.props.date : new Date();
        this.state = {
            months: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
            daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            selectedDay: initialDate.getDate(),
            selectedMonth: initialDate.getMonth(),
            selectedYear: initialDate.getFullYear(),
            month: initialDate.getMonth(),
            year: initialDate.getFullYear(),
            datesClasses: [classes.Dates],
        };
    }

    // handlers
    dayClickedHandler = (date) => {
        let selectedDateClasses = this.state.datesClasses;
        this.addOrRemove(selectedDateClasses, classes.Active);

        this.setState({
            selectedDay: date,
            selectedMonth: this.state.month,
            selectedYear: this.state.year,
            datesClasses: selectedDateClasses,
        });
    };

    scrollPreviousMonthHandler = () => {
        let newMonthState = this.state.month;
        let newYearState = this.state.year;
        newMonthState--;
        if (newMonthState < 0) {
            newMonthState = 11;
            newYearState--;
        }
        this.setState({ month: newMonthState, year: newYearState });
    };

    scrollNextMonthHandler = () => {
        let newMonthState = this.state.month;
        let newYearState = this.state.year;
        newMonthState++;
        if (newMonthState > 11) {
            newMonthState = 0;
            newYearState++;
        }
        this.setState({ month: newMonthState, year: newYearState });
    };

    selectedDateHandler = () => {
        let selectedDateClasses = this.state.datesClasses;
        this.addOrRemove(selectedDateClasses, classes.Active);
        this.setState({ datesClasses: selectedDateClasses });
    };

    // helpers
    getDate = () => {
        let day = this.state.selectedDay;
        if (day < 10) {
            day = "0" + day;
        }
        let month = this.state.selectedMonth + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let year = this.state.selectedYear;

        return day + " / " + month + " / " + year;
    };

    isLeapYear = (year) => {
        return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
    };

    addOrRemove = (array, item) => {
        const index = array.indexOf(item);
        if (index === -1) {
            array.push(item);
        } else {
            array.splice(index, 1);
        }
    };

    generateDays = () => {
        let days = this.state.daysInMonth[this.state.month];
        if (this.state.month === 1 && this.isLeapYear(this.state.year)) {
            days++;
        }
        const dayObjects = [];
        for (let i = 1; i <= days; i++) {
            if (
                this.state.selectedDay === i &&
                this.state.selectedMonth === this.state.month
            ) {
                dayObjects.push(
                    <Day
                        key={i}
                        day={i}
                        clicked={this.dayClickedHandler}
                        selected
                    />
                );
            } else {
                dayObjects.push(
                    <Day key={i} day={i} clicked={this.dayClickedHandler} />
                );
            }
        }
        return dayObjects;
    };

    render() {
        let currentDate = this.getDate();
        const currentMonth = `${this.state.months[this.state.month]} ${
            this.state.year
        }`;
        const days = this.generateDays();

        return (
            <div className={classes.DatePicker}>
                <div
                    className={classes.SelectedDate}
                    onClick={this.selectedDateHandler}
                >
                    {currentDate}
                </div>

                <div className={this.state.datesClasses.join(" ")}>
                    <div className={classes.Month}>
                        <div
                            className={classes.Arrows}
                            onClick={this.scrollPreviousMonthHandler}
                        >
                            &lt;
                        </div>
                        <div className={classes.Mth}>{currentMonth}</div>
                        <div
                            className={classes.Arrows}
                            onClick={this.scrollNextMonthHandler}
                        >
                            &gt;
                        </div>
                    </div>
                    <div className={classes.Days}>{days}</div>
                </div>
            </div>
        );
    }
}

export default DatePicker;
