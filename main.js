// DOM Selectors
const date_range_picker_element = document.querySelector(
    ".custom-date-range-picker"
);
const from_element = document.querySelector(
    ".custom-date-range-picker .selected-date-range .from"
);
const to_element = document.querySelector(
    ".custom-date-range-picker .selected-date-range .to"
);
const calendar_container_element = document.querySelector(
    ".custom-date-range-picker .calendar-container"
);
const left_calendar_element = document.querySelector(
    ".custom-date-range-picker .calendar-container .calendar.left"
);
const right_calendar_element = document.querySelector(
    ".custom-date-range-picker .calendar-container .calendar.right"
);
const left_calendar_month_element = document.querySelector(
    ".custom-date-range-picker .calendar-container .calendar.left .nav .month"
);
const right_calendar_month_element = document.querySelector(
    ".custom-date-range-picker .calendar-container .calendar.right .nav .month"
);
const prev_month_element = document.querySelector(
    ".custom-date-range-picker .calendar-container .calendar.left .nav .arrow"
);
const next_month_element = document.querySelector(
    ".custom-date-range-picker .calendar-container .calendar.right .nav .arrow"
);
const left_calender_dates_element = document.querySelector(
    ".custom-date-range-picker .calendar-container .calendar.left .boxes.dates"
);
const right_calender_dates_element = document.querySelector(
    ".custom-date-range-picker .calendar-container .calendar.right .boxes.dates"
);

// Helper Constants
const months = [
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
];
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Initialize Calender

// From
let leftDate = new Date();
let leftDay = leftDate.getDate();
let leftMonth = leftDate.getMonth();
let leftYear = leftDate.getFullYear();

let selectedFromDate = leftDate;
let selectedFromDay = leftDay;
let selectedFromMonth = leftMonth;
let selectedFromYear = leftYear;

let rightDate = new Date();
rightDate.setMonth(rightDate.getMonth() + 1);
let rightDay = rightDate.getDate();
let rightMonth = rightDate.getMonth();
let rightYear = rightDate.getFullYear();

let selectedToDate = rightDate;
let selectedToDay = rightDay;
let selectedToMonth = rightMonth;
let selectedToYear = rightYear;

// Set Initial Value
from_element.textContent = formatDate(leftDate);
from_element.dataset.value = leftDate;

to_element.textContent = formatDate(rightDate);
to_element.dataset.toDate = rightDate;

left_calendar_month_element.textContent = months[leftMonth] + " " + leftYear;
right_calendar_month_element.textContent = months[rightMonth] + " " + rightYear;

populateDates();

// Event Listeners

// Functions
function populateDates() {
    left_calender_dates_element.innerHTML = "";
    right_calender_dates_element.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDay; i++) {
        const blank_box_element = document.createElement("div");
        blank_box_element.classList.add("box");
        datesEl.appendChild(blank_box_element);
    }

    let totalDays = daysInMonth[month];
    if (isLeapYear(year) && month === 1) {
        totalDays = 29;
    }

    for (let i = 0; i < totalDays; i++) {
        const date_element = document.createElement("div");
        date_element.classList.add("box", "date");
        date_element.textContent = i + 1;

        if (
            selectedDay == i + 1 &&
            selectedYear == year &&
            selectedMonth == month
        ) {
            date_element.classList.add("selected");
        }

        date_element.addEventListener("click", function () {
            selectedDate = new Date(year + "-" + (month + 1) + "-" + (i + 1));
            selectedDay = i + 1;
            selectedMonth = month;
            selectedYear = year;

            el.textContent = formatDate(date);
            el.dataset.value = date;

            populateDates();
        });

        datesEl.appendChild(date_element);
    }
}

// Helper Functions
function formatDate(date) {
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;

    let month = date.getMonth() + 1;
    month = month < 10 ? "0" + month : month;

    let year = date.getFullYear();

    return day + " / " + month + " / " + year;
}

function isLeapYear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}
