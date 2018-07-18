var pageNumber = 1;
var newRow  = null;
var bookSelected = null;
var indexOfRow = 0;
var countOfBook = 1;

function showBooks() {
  this.show = function() {
    makeApiCall("php/page/1");
    addEventOnNavBar();
    $(window).scroll(function() {
        var url = null;
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            pageNumber++;
            if (bookSelected != null) {
                url = bookSelected + "/page/" + pageNumber ;
            } else {
                url = 'php/page/'+ pageNumber;
              }
            console.log(pageNumber);
            makeApiCall(url);
        }
    });
  }
}

function createBookTile(resp) {
    var starRating = "";
    var bookContainer = $(".books-container");
    for (var j = 0; j < 5; j++) {
        starRating += "<span class='fa fa-star rating'></span>";
    }
    if( $(".book-row").eq(indexOfRow).text() === "" ) {
        var newRow = $("<div class='book-row row'></div>");
        $('.books-container').append(newRow);
    }
    var temp = countOfBook;
    for(; countOfBook < resp.Books.length + temp; countOfBook++) {
        var bookIndex = (countOfBook - 1) % 10;
        var bookTile = "<div class='col-md-3 col-sm-6 book-tile'>\
                            <div class='book'>\
                              <div class='image-container'><img  class='image' src='" + resp.Books[bookIndex].Image + "' title='ISBN: "+ resp.Books[bookIndex].ID +"'></div>\
                              <div class='title'><span>" + resp.Books[bookIndex].Title + "</span></div>\
                              <div class='book-desc'>" + resp.Books[bookIndex].Description + "</div><hr class='separator'/>\
                              <div class='clearfix rating-heart-container'><div class='rating-bar'>" + starRating + "</div><div class='heart-img-container'><i class='heart-img fa fa-heart-o'/></div></div>\
                              <div class='buy-button'><button class='btn btn-success button' data-toggle='modal' data-target='#book-modal' data-id='" + JSON.stringify(resp.Books[bookIndex]).replace(/'/g, "\\u0027") + "'>DETAIL</button></div>\
                            </div>\
                          </div>";
        $('.book-row').eq(indexOfRow).append(bookTile);

        if((countOfBook > 1) && (countOfBook % 4) == 0) {
            var newRow = $("<div class='book-row row'></div>");
            $('.books-container').append(newRow);
            indexOfRow++;
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

    $('.button').on("click", function () {
        var bookInfo = $(this).data('id');
        $(".modal-isdn-number").html(bookInfo.ID);
        $(".modal-description").html(bookInfo.Description);
        $(".modal-sub-title").html(bookInfo.isbn);
        $(".modal-book-image").attr("src", bookInfo.Image);
        $(".modal-title").html(bookInfo.Title);
    });
}

function addEventOnNavBar() {
    var bookNames = $(".book-name").on("click", function(event) {
        countOfBook = 1;
        pageNumber = 1;
        indexOfRow = 0;
        bookSelected = event.target.innerHTML;
        $(".books-container").text('');
        makeApiCall(bookSelected);
    });
}

function makeApiCall(book) {
    $.ajax({
      url: 'http://it-ebooks-api.info/v1/search/'+ book,
      type: 'GET',
      data: {
          format: 'json'
      },
      success: function(response) {
          createBookTile(response);
      },
      error: function() {
          $('#errors').text("There was an error processing your request. Please try again.");
      }
  });
}
