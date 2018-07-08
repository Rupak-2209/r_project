var dateContainer = null;
var date = null;
var yearHeading = null;
var monthHeading = null;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
var currentDate = new Date();
var eventStartDate = 0;
var eventEndDate = 0;

var employees = [
    { "name":"Rahul Kulmi", "birth":"1988-05-28" },
    { "name":"Vishal Patidar", "birth":"1994-06-20" },
    { "name":"Awanish Tiwari", "birth":"1974-07-06" },
    { "name":"Surendra Patidar", "birth":"1988-07-21" },
    { "name":"Anjana Singh", "birth":"1992-07-24" },
    { "name":"Aaditya Paliwal", "birth":"1994-08-08" },
    { "name":"Varsha Tyagi", "birth":"1992-10-13" },
    { "name":"Priyanshi Asawara", "birth":"1993-11-19" },
    { "name":"Shashank Saxena", "birth":"1993-11-19" },
    { "name":"Nitesh Thakur", "birth":"1990-12-12" },
    { "name":"Satya Sir", "birth":"1983-12-12" },
    { "name":"Shubham Katariya", "birth":"1995-01-03" },
    { "name":"Shikha Shakarwar", "birth":"1994-01-15" },
    { "name":"Vipin Joshi", "birth":"1946-01-15" },
    { "name":"Gurpreet Chhabra", "birth":"1995-04-02" },
    { "name":"Rashmi Soni", "birth":"1993-09-19" },
    { "name":"Sonam Ravi Gupta", "birth":"1987-04-22" },
    { "name":"Siyaram Patidar", "birth":"1985-04-03" },
    { "name":"Shubham Choubey", "birth":"1993-05-08" },
    { "name":"Mayur Vaidya", "birth":"1995-05-09" },
    { "name":"Amit Nagar", "birth":"1986-05-10" },
    { "name":"Deepak Patidar", "birth":"1990-05-10" },
    { "name":"Rupak Gupta", "birth":"1995-09-22" },
    { "name":"Piyush Chandal", "birth":"1996-10-16" },
    { "name":"Darshana", "birth":"1997-01-15" },
    { "name":"Abhijeet", "birth":"1996-12-03" }
];

(function() {
    createHeadings();
    createCalendar();
    addBirthdayEvent();
})();

function addBirthdayEvent() {
    //fetch all birthday of this month
    var first = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    var names;
    for(var i = 0; i < employees.length; i++) {
        var person = new Date(employees[i].birth);
        if(person.getMonth() === currentDate.getMonth()) {
            var title = $(".date-block").eq(person.getDate() + first.getDay() - 1).children().attr("title");
            if(title == null) {
                $(".date-block").eq(person.getDate() + first.getDay() - 1).children().addClass("birthday").attr("title", employees[i].name);
            } else {
                names = title + "," + employees[i].name;
                $(".date-block").eq(person.getDate() + first.getDay() - 1).children().attr("title", names);
            }
        }
    }
    if(new Date().getMonth() == currentDate.getMonth()) {
        $(".date-block").eq(new Date().getDate() + first.getDay() - 1).children().addClass("today").attr("title", "Today");
    }
}

function createHeadings() {
    monthHeading = $("<div></div>").attr("class", "month-heading");
    updateMonthHeading();
    yearHeading = $("<div></div>").attr("class", "year-heading");
    updateYearHeading();
    weekDaysList = $("<div></div>").attr("class", "week-days-list");
    weekDay = $("<ul></ul>").addClass("day-name");
    for(var i = 0; i < 7; i++){
        weekDay.append("<li class='days'>" +day[i]+ "</li>");
    }
    weekDaysList.append(weekDay);
    dateContainer = $("<div></div>").addClass("date-container");
    $("#calendar").append(yearHeading, monthHeading, weekDaysList);
}

function updateMonthHeading() {
    monthHeading.html("<button onclick='previousMonth()' class='left-arrow'>&lt</button>"+ monthNames[currentDate.getMonth()] +"<button onclick='nextMonth()' class='right-arrow'>&gt</button>");
}

function updateYearHeading() {
    yearHeading.html("<button onclick='previousYear()' class='left-arrow'>&lt</button>"+ currentDate.getFullYear() +"<button onclick='nextYear()' class='right-arrow'>&gt</button>");
}

function createCalendar() {
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var previousMonth = new Date(year, month, 0);
    var previousDate = previousMonth.getDate();
    var nextMonthDate = new Date(year, month + 1, 1);
    var nextDate = nextMonthDate.getDate();
    var countNextDate = firstDay.getDay();

    var temp = previousMonth.getDate() - countNextDate + 1;
    var dateCount;
    if((firstDay.getDay() + lastDay.getDate()) > 35) {
        numOfDates = 42;
    } else {
        numOfDates = 35;
      }
    for(var count = 0; count < numOfDates; count++) {
        dateCount = new Date(year, month - 1, temp + count);
        if(currentDate.getMonth() == dateCount.getMonth()) {
            appendDate(dateCount.getDate());
            if(dateCount.getDay() == 6) {
                addDate.addClass("saturday");
            }
            if(dateCount.getDay() == 0) {
                addDate.addClass("sunday");
            }
        } else {
             appendDate(dateCount.getDate(), -1);
          }
     }
}

function appendDate(dateCount, dateCheck) {
    var birthdayPerson = '';
    if(dateCount != -1 && dateCheck == -1) {
        creatingDate(dateCount);
        date.addClass("other-month");
    } else {
        creatingDate(dateCount);
        date.click(function(event) {
            selectRange(event.currentTarget.innerHTML);
        });
      }
    $("#calendar").append(dateContainer);
}

function selectRange(selectedDate) {
    if(!eventStartDate) {
        eventStartDate = selectedDate;
        $(".date").removeClass("range-element");
        $("#select").text('');
    } else if(eventStartDate && !eventEndDate) {
        eventEndDate = selectedDate;
    }
    if(eventStartDate && eventEndDate) {
        var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        console.log("inside both");
        if(eventStartDate < eventEndDate){
            while(eventStartDate <= eventEndDate) {
                // console.log("inside inner");
                // console.log("event occured!!" + "end" +eventEndDate);
                // console.log($(".date-block").eq(eventStartDate + firstDayOfMonth.getDay() - 1));
                var dayOfEvent = new Date(currentDate.getFullYear(), currentDate.getMonth(), eventStartDate);
                $(".date-block").eq(eventStartDate + firstDayOfMonth.getDay() - 1).children().addClass("range-element");
                $("#select").append(eventStartDate + " " + day[dayOfEvent.getDay()]);
                eventStartDate++;
            }
            eventStartDate = 0;
            eventEndDate = 0;
        }
        if(eventEndDate < eventStartDate){
            while(eventEndDate <= eventStartDate) {
                // console.log("inside inner");
                // console.log("event occured!!" +eventStartDate+ "end" +eventEndDate);
                // console.log($(".date-block").eq(eventEndDate + firstDayOfMonth.getDay() - 1));
                var dayOfEvent = new Date(currentDate.getFullYear(), currentDate.getMonth(), eventEndDate);
                $(".date-block").eq(eventEndDate + firstDayOfMonth.getDay() - 1).children().addClass("range-element");
                $("#select").append(eventEndDate + " " + day[dayOfEvent.getDay()]);
                eventEndDate++;
            }
            eventStartDate = 0;
            eventEndDate = 0;
        }
    }
}

function creatingDate(dateCount) {
    addDate = $("<div></div>").attr("class", "date-block");
    dateContainer.append(addDate);
    date = $("<div></div>" , { text: dateCount }).attr("class", "date");
    addDate.append(date);
}

function createMonth() {
    updateMonthHeading();
    dateContainer.text('');
    createCalendar();
    addBirthdayEvent();
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateYearHeading();
    createMonth();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateYearHeading();
    createMonth();
}

function previousYear() {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    updateYearHeading();
    dateContainer.text('');
    createCalendar();
    addBirthdayEvent();
}

function nextYear() {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    updateYearHeading();
    dateContainer.text('');
    createCalendar();
    addBirthdayEvent();
}
