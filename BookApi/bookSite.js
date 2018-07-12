var pageNumber = 1;
var newRow  = null;
var bookSelected = null;

$(document).ready(function() {
    makeApiCall("php");
    addEventOnNavBar();
});

function createBookTile(resp) {
    var starRating = "";
    var bookContainer = $(".books-container");
    for (var j = 0; j < 5; j++) {
        starRating += "<span class='fa fa-star rating'></span>";
    }
    for (var i = 0; i < resp.Books.length ; i++) {
        if (i == 0) {
            newRow = $("<div class='book-row row'></div>");
            bookContainer.append(newRow);
        }
        var bookTile = "<div class='col-md-3 col-sm-6 book-tile'>\
                            <div class='book'>\
                              <div class='image-container'><img  class='image' src='" + resp.Books[i].Image + "' title='ISBN: "+ resp.Books[i].ID +"'></div>\
                              <div class='title'><span>" + resp.Books[i].Title + "</span></div>\
                              <div class='book-desc'>" + resp.Books[i].Description + "</div><hr class='separator'/>\
                              <div class='clearfix rating-heart-container'><div class='rating-bar'>" + starRating + "</div><div class='heart-img-container'><i class='heart-img fa fa-heart-o'/></div></div>\
                              <div class='buy-button'><center><button class='btn btn-success button'>BUY</button></center></div>\
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
}

$(window).scroll(function() {
    if ($(window).innerHeight() + window.scrollY >= document.body.scrollHeight) {
        url = bookSelected +"/page"+ pageNumber;
        pageNumber++;
        makeApiCall(url);
    }
});

function addEventOnNavBar() {
    var bookNames = $(".book-name").on("click", function(event) {
        bookSelected = event.target.innerHTML;
        $(".books-container").text('');
        makeApiCall(bookSelected);
    });
}

function makeApiCall(book) {
    $.ajax({
      url: 'http://it-ebooks-api.info/v1/search/'+ book +'/',
      type: 'GET',
      data: {
          format: 'json'
      },
      success: function(response) {
          console.log(response);
          createBookTile(response);
      },
      error: function() {
          $('#errors').text("There was an error processing your request. Please try again.");
      }
  });
}
