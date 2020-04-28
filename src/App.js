import React, { Component } from "react";
import DatePicker from "./Components/DatePicker/DatePicker";

export class App extends Component {
    render() {
        const date = new Date(2018, 1, 28);

        return (
            <div>
                <DatePicker date={date} />
            </div>
        );
    }
}

export default App;
