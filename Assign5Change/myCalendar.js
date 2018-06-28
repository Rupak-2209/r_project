var counter = 0;
var dateContainer = null;
var date = null;
var parentEle = null;
var yearHeading = null;
var monthHeading = null;
var flagForSunday = 0;
var flagForSaturday = 0;
var flag = 0;
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
var currentDate = new Date();

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

monthHeading = document.createElement("div");
monthHeading.setAttribute("class", "month-heading");
updateMonthHeading();
yearHeading = document.createElement("div");
yearHeading.setAttribute("class", "year-heading");
updateYearHeading();
weekDaysList = document.createElement("div");
weekDaysList.setAttribute("class", "week-days-list");
weekDaysList.innerHTML = "<ul class='day-name'>\
                            <li class='days'>Sunday</li>\
                            <li class='days'>Monday</li>\
                            <li class='days'>Tuesday</li>\
                            <li class='days'>Wednesday</li>\
                            <li class='days'>Thusday</li>\
                            <li class='days'>Friday</li>\
                            <li class='days'>Saturday</li>\
                          </ul>";
dateContainer = document.createElement("div");
dateContainer.setAttribute("class","date-container");

(function() {
    createCalendar();
})();

function createCalendar() {
    counter = 0;
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var previousMonth = new Date(year, month, 0);
    var previousDate = previousMonth.getDate();
    var nextMonthDate = new Date(year, month + 1, 1);
    var nextDate = nextMonthDate.getDate();
    var countNextDate = firstDay.getDay();
    var countPreDate = lastDay.getDay();

    for(var j = 0; j < countNextDate; j++) {
        counter++;
        appendDate(previousDate - countNextDate + 1, -1);
        previousDate++;
    }
    for(var i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        counter++;
        if((i == new Date().getDate()) && (currentDate.toDateString() == new Date().toDateString())){
          appendDate(i);
          date.setAttribute("style", "background-color: pink");
          date.setAttribute("title", "today");
        } else {
          appendDate(i);
        }
    }
    for(var j = 0; j < (6 - countPreDate); j++) {
        counter++;
        appendDate(nextDate, -1);
        nextDate++ ;
      }
}

function appendDate(dateCount, dateCheck) {
    var birthdayPerson = '';
    if(dateCount != -1 && dateCheck == -1) {
        creatingDate(dateCount);
        date.setAttribute("style", "background-color: #d3d3d3; color: gray;");
      } else {
            creatingDate(dateCount);
            console.log(currentDate.getDay());
            // setting title to the birth date of person
            for(var i = 0; i < employees.length; i++) {
                var person = new Date(employees[i].birth);
                if(person.getDate() === dateCount && person.getMonth() === currentDate.getMonth()) {
                    birthdayPerson += employees[i].name + ",";
                }
            }
            if(birthdayPerson != '') {
                date.setAttribute("title", birthdayPerson);
                date.setAttribute("style", "background-color: #87ceeb; color: white");
            }
            birthdayPerson = '';
        }
    parentEle = document.getElementById("test");
    parentEle.append(yearHeading);
    parentEle.append(monthHeading);
    parentEle.append(weekDaysList);
    parentEle.append(dateContainer);
}

function creatingDate(dateCount) {
    var addDate = document.createElement("div");
    addDate.setAttribute("class", "date-block");
    dateContainer.appendChild(addDate);
    date = document.createElement("div");
    date.setAttribute("class", "date");
    date.innerHTML = dateCount;
    addDate.appendChild(date);
    if(counter % 7 == 0) {
        console.log(counter+ "green");
        date.setAttribute("style", "color: #16d69b");
    }
    if(counter % 7 == 1) {
        console.log(counter+ "red");
        date.setAttribute("style", "color: #ff0000");
    }
}

function createMonth() {
    updateMonthHeading();
    dateContainer.innerHTML = '';
    createCalendar();
}

function updateMonthHeading() {
    monthHeading.innerHTML = "<button onclick='previousMonth()' class='left-arrow'>\<</button>"+ monthNames[currentDate.getMonth()] +"<button onclick='nextMonth()' class='right-arrow'>\></button>";
}

function updateYearHeading() {
    yearHeading.innerHTML = "<button onclick='previousYear()' class='left-arrow'>\<</button>"+ currentDate.getFullYear() +"<button onclick='nextYear()' class='right-arrow'>\></button>";
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
    dateContainer.innerHTML = '';
    createCalendar();
}

function nextYear() {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    updateYearHeading();
    dateContainer.innerHTML = '';
    createCalendar();
}
