import React from "react";
import classes from "./Day.module.css";

const Day = (props) => {
  const dayClasses = [classes.Day];
  if (props.selected) dayClasses.push(classes.Selected);
  return (
    <div
      className={dayClasses.join(" ")}
      onClick={() => props.clicked(props.day)}
    >
      {props.day}
    </div>
  );
};

export default Day;
