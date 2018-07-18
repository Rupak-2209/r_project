var pageNumber = 1;
var newRow  = null;
var bookSelected = null;

var books = [{"ID":3839728967,"Title":"Pro PHP and jQuery, 2nd Edition","SubTitle":"Take your dynamic PHP 7 apps to the next level by adding a JavaScript layer using jQuery","Description":"Take advantage of the improved performance and reduced memory requirements of PHP version 7, and learn to utilize the new built-in PHP functions and features such as typed variable enforcement with declare(strict_types=1) and the new available data t ...","Image":"http://s.it-ebooks-api.info/6/pro_php_and_jquery_2nd_edition.jpg","isbn":"9781484212318"},{"ID":1229409287,"Title":"Programming Rust","SubTitle":"Fast, Safe Systems Development","Description":"Rust is a new systems programming language that combines the performance and low-level control of C and C++ with memory safety and thread safety. Rust's modern, flexible types ensure your program is free of null pointer dereferences, double frees, da ...","Image":"http://s.it-ebooks-api.info/3/programming_rust.jpg","isbn":"9781491927281"},{"ID":1568684320,"Title":"Getting Started with SOQL","SubTitle":"Revolutionize the use of simple query strings to make them more efficient using SOQL","Description":"This practical guide will tell you everything you need to know about SOQL statements. You will learn the optimum way to write complex SOQL statements with this easy-to-understand guide. Beginning with basic SOQL statements, you will progress quickly ...","Image":"http://s.it-ebooks-api.info/14/getting_started_with_soql.jpg","isbn":"9781783287352"}]

$(document).ready(function() {
    makeApiCall("php");
    addEventOnNavBar();
});

function createBookTile() {
    var starRating = "";
    var bookContainer = $(".books-container");
    for (var j = 0; j < 5; j++) {
        starRating += "<span class='fa fa-star rating'></span>";
    }
    for (var i = 0; i < books.length ; i++) {
        if (i == 0) {
            newRow = $("<div class='book-row row'></div>");
            bookContainer.append(newRow);
        }
        var bookTile = "<div class='col-md-3 col-sm-6 col-xs-12 book-tile'>\
                            <div class='book'>\
                              <div class='image-container'><img  class='image' src='" + books[i].Image + "' title='ISBN: "+ books[i].ID +"'></div>\
                              <div class='title'><span>" + books[i].Title + "</span></div>\
                              <div class='book-desc'>" + books[i].Description + "</div><hr class='separator'/>\
                              <div class='clearfix rating-heart-container'><div class='rating-bar'>" + starRating + "</div><div class='heart-img-container'><i class='heart-img fa fa-heart-o'/></div></div>\
                              <div class='buy-button'><button class='btn btn-success button' data-toggle='modal' data-target='#book-modal' data-id='" + JSON.stringify(books[i]) + "'>BUY</button></div>\
                            </div>\
                          </div>";
        newRow.append(bookTile);

        if((i + 1) % 4 == 0) {
            newRow = $("<div class='book-row row'></div>");
            bookContainer.append(newRow);
        }
    }


    $(".rating").click( function() {
        $(this).parent().children().removeClass('show-rating');
        $(this).addClass('show-rating');
        $(this).prevAll().addClass('show-rating');
    });

    $(".heart-img").click( function() {
        $(this).toggleClass('heart-clicked');
    });

    $(".book-name").click( function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    });

    $(".button").on("click", function () {
        var bookInfo = $(this).data('id');
        $(".modal-isdn-number").html(bookInfo.ID);
        $(".modal-description").html(bookInfo.Description);
        $(".modal-sub-title").html(bookInfo.SubTitle);
        $(".modal-book-image").attr("src", bookInfo.Image);
        $(".modal-title").html(bookInfo.Title);
    });
}

function addEventOnNavBar() {
    var bookNames = $(".book-name").on("click", function(event) {
        bookSelected = event.target.innerHTML;
        $(".books-container").text('');
        makeApiCall(bookSelected);
    });
}

function myFunction() {
    $(".icon").click( function() {
        $('.vertical-menu').toggleClass('.topnav');
    });
}

function makeApiCall(book) {
    createBookTile();
}
