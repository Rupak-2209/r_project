 if( document.getElementById ){
   console.log("exist");
 }
 else {
   console.log("Not exist");
 }

//using method and its property
//   Using id
   document.getElementById("name").innerHTML = "Hello ALL";
   //using Name
   document.getElementsByTagName("p")[0].innerHTML = "Hello ALL1";
   //OR
   var x = document.getElementsByTagName("p");
   x[0].innerHTML = "Hello ALL2";

  // finding elemnt inside the particular
   var x1 = document.getElementById("p2");
   var x2 = x1.getElementById("p3");
   x2.innerHTML = "hii";

   //find element by class
    var class1 = document.getElementsByClassName("class1")
    console.log(class1[0].innerHTML);

   //using document object
   document.write(Date());

   //change value of html attribute
    document.getElementById("block").style.width = "50%";
    console.log(document.getElementById("block").style);
