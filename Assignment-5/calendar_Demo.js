  var count = 1;
  var date_container, date, month, year, parentEle, arrow, year_heading, flag;
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
  var c_date = new Date();

  var month_heading = document.createElement("div");
  month_heading.setAttribute("class", "month_heading");
  month_heading.innerHTML = "<button onclick = 'previousMonth()' class = 'left-arrow'>\<</button>"+ monthNames[c_date.getMonth()] +"<button onclick = 'nextMonth()' class = 'right-arrow'>\></button>";

  var year_heading = document.createElement("div");
  year_heading.setAttribute("class", "year_heading");
  year_heading.innerHTML = "<button onclick = 'previousYear()' class = 'left-arrow'>\<</button>"+ c_date.getFullYear() +"<button onclick = 'nextYear()' class = 'right-arrow'>\></button>";
  var week_days_list = document.createElement("div");
  week_days_list.setAttribute("class", "week_days_list");
  week_days_list.innerHTML = "<ul class='day-name'><li class='days'>Sunday</li><li class='days'>Monday</li><li class='days'>Tuesday</li><li class='days'>Wednesday</li><li class='days'>Thusday</li><li class='days'>Friday</li><li class='days'>Saturday</li></ul>"
  date_container = document.createElement("div");
  date_container.setAttribute("class","date_container");

function dateBlock(c_date){
    date_block = document.createElement("div");
    date_block.setAttribute("class","date_block");
    date_container.appendChild(date_block);
    date = document.createElement("div");
    date.setAttribute("class","date");
    date.innerHTML = c_date;
    date_block.appendChild(date);
    if(flag == 1){
      date_block.setAttribute("style", "background-color: #fce9f0");
    }
}

function addBlock1(c_date, p_date) {
    if(c_date != -1 && p_date == -1) {
        dateBlock(c_date);
        date.setAttribute("style", "background-color: orange; color: white");
        //date.setAttribute("style", "disable: true");
        //date_block.style.visibility = "hidden";
    } else {
        dateBlock(c_date);
    }
    parentEle = document.getElementById("calendar");
    parentEle.append(year_heading);
    parentEle.append(month_heading);
    parentEle.append(week_days_list);
    parentEle.append(date_container);
}

function removeBlock() {
    var block = document.getElementsByClassName("date_container");
    while (block[0].hasChildNodes()) {
        block[0].removeChild(block[0].lastChild);
    }
}

function share() {
    var firstDay = new Date(c_date.getFullYear(), c_date.getMonth(), 1);
    var lastDay = new Date(c_date.getFullYear(), c_date.getMonth()+1, 0);
    var currentMonth = monthNames[firstDay.getMonth()];
    var previousMonth = new Date(c_date.getFullYear(), c_date.getMonth(), 0);
    var previousDate = previousMonth.getDate();
    var nextMonthDate = new Date(c_date.getFullYear(), c_date.getMonth()+1, 1);
    var nextDate = nextMonthDate.getDate();
    var dayNo = firstDay.getDay();
    for(var j = 0; j < dayNo; j++) {
        addBlock1(previousDate-dayNo+1, -1);
        previousDate++ ;
        //date.setAttribute("style", "background-color: #819FF7");
      }

    flag = 1;
    for(var i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      if(i == today && (c_date.toDateString() == new Date().toDateString())){
        flag = 1;
        addBlock1(i);
    } else {
      flag = 0;
      addBlock1(i);
    }
    }
    if((35-dayNo-lastDay.getDate()) >= 0){
    for(var j = 0; j < (35-dayNo-lastDay.getDate()); j++) {
      console.log("hii");
      addBlock1(nextDate, -1);
      nextDate++ ;
    }
  } else {
    for(var j = 0; j < (7+(35-dayNo-lastDay.getDate())); j++) {
      console.log("hii");
      addBlock1(nextDate, -1);
      nextDate++ ;
    }
  }
}

function createMonth() {
    month_heading.innerHTML ="<button onclick = 'previousMonth()' class = 'left-arrow'>\<</button>"+ monthNames[c_date.getMonth()] +"<button onclick = 'nextMonth()' class = 'right-arrow'>\></button>";
    removeBlock();
    share();
}

function previousMonth() {
    c_date.setMonth(c_date.getMonth() - 1);
    createMonth();
  }

function nextMonth() {
    c_date.setMonth(c_date.getMonth()+1);
    year_heading.innerHTML ="<button onclick = 'previousYear()' class = 'left-arrow'>\<</button>"+ c_date.getFullYear() +"<button onclick = 'nextYear()' class = 'right-arrow'>\></button>";
    createMonth();
}

function previousYear() {
    c_date.setFullYear(c_date.getFullYear()-1);
    year_heading.innerHTML ="<button onclick = 'previousYear()' class = 'left-arrow'>\<</button>"+ c_date.getFullYear() +"<button onclick = 'nextYear()' class = 'right-arrow'>\></button>";
    removeBlock();
    share();
}

function nextYear() {
    c_date.setFullYear(c_date.getFullYear()+1);
    year_heading.innerHTML ="<button onclick = 'previousYear()' class = 'left-arrow'>\<</button>"+ c_date.getFullYear() +"<button onclick = 'nextYear()' class = 'right-arrow'>\></button>";
    removeBlock();
    share();
}

(function() {
    var firstDay = new Date(c_date.getFullYear(), c_date.getMonth(), 1);
    var lastDay = new Date(c_date.getFullYear(), c_date.getMonth() + 1, 0);
    var previousMonth = new Date(c_date.getFullYear(), c_date.getMonth(), 0);
    var previousDate = previousMonth.getDate();
    var nextMonthDate = new Date(c_date.getFullYear(), c_date.getMonth()+1, 1);
    var nextDate = nextMonthDate.getDate();

    today = new Date().getDate();
    var dayNo = firstDay.getDay();

    for(var j = 0; j < dayNo; j++) {
      addBlock1(previousDate-dayNo+1, -1);
      previousDate++ ;
    }
    flag = 0;
    for(var i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      if(i == today && (c_date.toString() == new Date().toString())){
        flag = 1;
        addBlock1(i);
    } else {
      flag = 0;
      addBlock1(i);
    }
    }
    for(var j = 0; j < (35-dayNo-lastDay.getDate); j++) {
      addBlock1(nextDate, -1);
      nextDate++ ;
    }
})();
