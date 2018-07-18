var pageNumber = 1;
var newRow  = null;
var bookSelected = null;
var indexOfRow = 0;
var countOfBook = 1;
var apiResponse = null;
var addComponent = null;

$(document).ready(function() {
    addComponent = new addComponents();
    addComponent.addSubjectNames();
    makeApiCall("php", pageNumber);
    $('.book-name').first().addClass('active');
    wireEvents();
});

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

function showBookDetail(bookId) {
    $('.content').append(addComponent.showBookDetail(bookId, apiResponse));
}

var showHeartSelected = function (event) {
    $(event.target).toggleClass('heart-clicked');
}

var showRating = function (event) {
    var selectedStar = $(event.target);
    selectedStar.parent().children().removeClass('show-rating');
    selectedStar.addClass('show-rating');
    selectedStar.prevAll().addClass('show-rating');
}

var onSubjectChange = function (event, subjectName) {
      console.log("comming");
      var clickedBook = $(event.target);
      clickedBook.siblings().removeClass('active');
      clickedBook.addClass('active');
      pageNumber = 1;
      $(".books-container").text('');
      makeApiCall(subjectName, pageNumber);
};
function makeApiCall(bookName, pageNo) {
    $.ajax({
      url: 'http://it-ebooks-api.info/v1/search/' + bookName + '/page/' + pageNo,
      type: 'GET',
      data: {
          format: 'json'
      },
      success: function (response) {
          apiResponse = response;
          addComponent.createBookTile(response);
      },
      error: function() {
          $('#errors').text("There was an error processing your request. Please try again.");
      }
  });
}
