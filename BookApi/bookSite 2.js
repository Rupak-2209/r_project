var pageNumber = 1;
var newRow  = null;
var bookSelected = null;
var indexOfRow = 0;
var countOfBook = 1;
var apiResponse = null;

var initalize = function () {
  addSubjectNames();
  makeApiCall("php", pageNumber);
  addEventOnNavBar();
  wireEvents();
};

var wireEvents = function () {
  $(window).scroll(function() {
      var getBookName = null;
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          pageNumber++;
          if (bookSelected != null) {
              getBookName = bookSelected;
          } else {
              getBookName = 'php';
            }
          makeApiCall(getBookName, pageNumber);
      }
  });
};

function addSubjectNames() {
    var view = {"subject": [{ "name": "PHP" }, { "name": "JQUERY" }, { "name": "AJAX" }, { "name": "JAVA" }, { "name": "ANDROID" }, { "name": "PYTHON" }, { "name": "MONGODB" }, { "name": "ANGULAR" }, { "name": "NODEJS" }, { "name": "BOOTSTRAP" }]}
    var subjectName = $('#subject-name').html();
    $('.vertical-menu').append(Mustache.render(subjectName, view));
}

$(document).ready(function() {
    initalize();
});


function createBookTile(resp) {
    var template = $('#template').html();
    var bookTile = Mustache.render(template, resp);
    $('.books-container').append(bookTile);
}

var showBookDetail = function (bookId) {
    var view = null;
    $('.content').text('');
    for (var i = 0; i < apiResponse.Books.length; i++) {
        if(apiResponse.Books[i].ID == bookId) {
            var modalDetail = $('#modal-template').html();
            $('.content').text('');
            view = {
              "ID" : apiResponse.Books[i].ID,
              "Description" : apiResponse.Books[i].Description,
              "SubTitle" : apiResponse.Books[i].SubTitle,
              "Title" : apiResponse.Books[i].Title,
              "Image" : apiResponse.Books[i].Image
            };
            $('.content').append(Mustache.render(modalDetail, view));
        }
    }
};

var showHeartSelected = function (event) {
    $(event.target).toggleClass('heart-clicked');
}

var showBookNameActive = function (event) {
    var clickedBook = $(event.target)
    clickedBook.siblings().removeClass('active');
    clickedBook.addClass('active');
}

var showRating = function (event) {
    var selectedStar = $(event.target);
    selectedStar.parent().children().removeClass('show-rating');
    selectedStar.addClass('show-rating');
    selectedStar.prevAll().addClass('show-rating');
}

function addEventOnNavBar() {
    $('.book-name').first().addClass('active');
    var bookNames = $(".book-name").on("click", function(event) {
        bookSelected = event.target.innerHTML;
        pageNumber = 1;
        $(".books-container").text('');
        makeApiCall(bookSelected, pageNumber);
    });
}

function makeApiCall(bookName, pageNo) {
    $.ajax({
      url: 'http://it-ebooks-api.info/v1/search/' + bookName + '/page/' + pageNo,
      type: 'GET',
      data: {
          format: 'json'
      },
      success: function(response) {
          apiResponse = response;
          createBookTile(response);
      },
      error: function() {
          $('#errors').text("There was an error processing your request. Please try again.");
      }
  });
}
