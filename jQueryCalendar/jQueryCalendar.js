var _dateContainer = null;
var _date = null;
var _yearHeading = null;
var _monthHeading = null;
var _monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var _day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
var _currentDate = new Date();
var _eventStartDate = 0;
var _eventEndDate = 0;
var _employees = {
    "January": [
        { "name":"Darshana", "birth":"1997-01-15" },
        { "name":"Vipin Joshi", "birth":"1946-01-15" },
        { "name":"Shubham Katariya", "birth":"1995-01-03" },
        { "name":"Shikha Shakarwar", "birth":"1994-01-15" }
    ],
    "February": [
    ],
    "March": [
    ],
    "April": [
        { "name":"Sonam Ravi Gupta", "birth":"1987-04-22" },
        { "name":"Siyaram Patidar", "birth":"1985-04-03" },
        { "name":"Gurpreet Chhabra", "birth":"1995-04-02" }
    ],
    "May": [
        { "name":"Rahul Kulmi", "birth":"1988-05-28" },
        { "name":"Mayur Vaidya", "birth":"1995-05-09" },
        { "name":"Amit Nagar", "birth":"1986-05-10" },
        { "name":"Deepak Patidar", "birth":"1990-05-10" }
    ],
    "June": [
        { "name":"Vishal Patidar", "birth":"1994-06-20" }
    ],
    "July": [
        { "name":"Awanish Tiwari", "birth":"1974-07-06" },
        { "name":"Surendra Patidar", "birth":"1988-07-21" },
        { "name":"Anjana Singh", "birth":"1992-07-24" }
    ],
    "August": [
        { "name":"Aaditya Paliwal", "birth":"1994-08-08" }
    ],
    "September": [
        { "name":"Rashmi Soni", "birth":"1993-09-19" },
        { "name":"Rupak Gupta", "birth":"1995-09-22" }
    ],
    "October": [
        { "name":"Piyush Chandal", "birth":"1996-10-16" },
        { "name":"Varsha Tyagi", "birth":"1992-10-13" }
    ],
    "November": [
        { "name":"Priyanshi Asawara", "birth":"1993-11-19" },
        { "name":"Shashank Saxena", "birth":"1993-11-19" }
    ],
    "December": [
      { "name":"Nitesh Thakur", "birth":"1990-12-12" },
      { "name":"Satya Sir", "birth":"1983-12-12" },
      { "name":"Abhijeet", "birth":"1996-12-03" }
    ]
}

$(document).ready(function(){
    createHeadings();
    createCalendar();
    addBirthdayEvent();
});

function addBirthdayEvent() {
    //fetch all birthday of this month
    var firstDay = new Date(_currentDate.getFullYear(), _currentDate.getMonth(), 1);
    var names;
    console.log(_employees[_monthNames[firstDay.getMonth()]]);
    for(var i = 0; i < _employees[_monthNames[firstDay.getMonth()]].length; i++) {
        var person = new Date(_employees[_monthNames[firstDay.getMonth()]][i].birth);
        if(person.getMonth() === _currentDate.getMonth()) {
            var dateIndex = person.getDate() + firstDay.getDay() - 1;
            var title = $(".date-block").eq(dateIndex).children(".material-icons").attr("title");
            if(title == null) {
                $(".date-block").eq(dateIndex).append("<i class='material-icons'>cake</i>");
                $(".date-block").eq(dateIndex).children(".material-icons").addClass("birthday").attr("title", _employees[_monthNames[firstDay.getMonth()]][i].name);
                $(".date-block").eq(dateIndex).children(".material-icons").click(function(event) {
                    event.stopPropagation();
                    alert(event.target.title);
                });
            } else {
                names = title + "," + _employees[_monthNames[firstDay.getMonth()]][i].name;
                $(".date-block").eq(dateIndex).children(".material-icons").addClass("birthday").attr("title", names);
            }
        }
    }
    if(new Date().getMonth() == _currentDate.getMonth()) {
        $(".date-block").eq(new Date().getDate() + firstDay.getDay() - 1).append("<i class='fa fa-sun-o sun'></i>").children(".sun").addClass("today").attr("title", "Today");
    }
}

function createHeadings() {
    _monthHeading = $("<div></div>").addClass("month-heading");
    updateMonthHeading();
    _yearHeading = $("<div></div>").addClass("year-heading");
    updateYearHeading();
    weekDaysList = $("<div></div>").addClass("week-days-list");
    weekDay = $("<ul></ul>").addClass("day-name");
    for(var i = 0; i < 7; i++){
        weekDay.append("<li class='days'>"+ _day[i] +"</li>");
    }
    weekDaysList.append(weekDay);
    _dateContainer = $("<div></div>").addClass("date-container");
    $("#calendar").append(_yearHeading, _monthHeading, weekDaysList);
}

function updateMonthHeading() {
    _monthHeading.html("<button onclick='previousMonth()' class='left-arrow'>&lt</button>"+ _monthNames[_currentDate.getMonth()] +"<button onclick='nextMonth()' class='right-arrow'>&gt</button>");
}

function updateYearHeading() {
    _yearHeading.html("<button onclick='previousYear()' class='left-arrow'>&lt</button>"+ _currentDate.getFullYear() +"<button onclick='nextYear()' class='right-arrow'>&gt</button>");
}

function createCalendar() {
    var year = _currentDate.getFullYear();
    var month = _currentDate.getMonth();
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var previousMonth = new Date(year, month, 0);
    var previousDate = previousMonth.getDate();
    var countNextDate = firstDay.getDay();
    var temp = previousDate - countNextDate + 1;
    var dateCount = null;
    var j = 0;
    var i = 0;
    do {
        dateCount = new Date(year, month - 1, temp + i);
        appendDate(dateCount);
        if((dateCount.getDate() == lastDay.getDate()) && (lastDay.getDay() != 6)) {
            j = 7 - lastDay.getDay();
        }
        if(j != 0){
            j--;
        }
        i++;
     } while((dateCount.getMonth() <= _currentDate.getMonth()) || (j != 0));
}

function appendDate(dateCount) {
    if(dateCount.getMonth() != _currentDate.getMonth()) {
        creatingDate(dateCount.getDate());
        _date.parent().addClass("other-month");
    } else {
        creatingDate(dateCount.getDate());
        if(dateCount.getDay() == 6) {
            addDate.addClass("saturday");
        }
        if(dateCount.getDay() == 0) {
            addDate.addClass("sunday");
        }
        addDate.click(function(event) {
            selectRange(Number(event.target.childNodes[0].innerHTML));
        });
      }
    $("#calendar").append(_dateContainer);
}

function selectRange(selectedDate) {
    var firstDayOfMonth = new Date(_currentDate.getFullYear(), _currentDate.getMonth(), 1);
    if(_eventStartDate == 0) {
        _eventStartDate = selectedDate;
        $(".date-block").removeClass("range-element");
        $(".date-block").eq(_eventStartDate + firstDayOfMonth.getDay() - 1).addClass("range-element");
        $(".select").text('');
    } else if(_eventStartDate != 0 && _eventEndDate == 0) {
        _eventEndDate = selectedDate;
    }
    if(_eventStartDate && _eventEndDate) {
        if(_eventStartDate < _eventEndDate){
            colorSelectedDates(_eventStartDate, _eventEndDate, firstDayOfMonth);
        }
        if(_eventEndDate < _eventStartDate){
            colorSelectedDates(_eventEndDate, _eventStartDate, firstDayOfMonth);
        }
    }
}

function colorSelectedDates(startDate, endDate, firstDayOfMonth) {
    while(startDate <= endDate) {
        var dayOfEvent = new Date(_currentDate.getFullYear(), _currentDate.getMonth(), startDate);
        $(".date-block").eq(startDate + firstDayOfMonth.getDay() - 1).addClass("range-element");
        $(".select").append(startDate + " " + _day[dayOfEvent.getDay()]);
        startDate++;
    }
    _eventStartDate = 0;
    _eventEndDate = 0;
}

function creatingDate(dateCount) {
    addDate = $("<div></div>").attr("class", "date-block");
    _dateContainer.append(addDate);
    _date = $("<span></span>" , { text: dateCount }).addClass("date");
    addDate.append(_date);
}

function createMonth() {
    updateMonthHeading();
    _dateContainer.text('');
    createCalendar();
    addBirthdayEvent();
}

function previousMonth() {
    _currentDate.setMonth(_currentDate.getMonth() - 1);
    updateYearHeading();
    createMonth();
}

function nextMonth() {
    _currentDate.setMonth(_currentDate.getMonth() + 1);
    updateYearHeading();
    createMonth();
}

function previousYear() {
    _currentDate.setFullYear(_currentDate.getFullYear() - 1);
    updateYearHeading();
    _dateContainer.text('');
    createCalendar();
    addBirthdayEvent();
}

function nextYear() {
    _currentDate.setFullYear(_currentDate.getFullYear() + 1);
    updateYearHeading();
    _dateContainer.text('');
    createCalendar();
    addBirthdayEvent();
}
