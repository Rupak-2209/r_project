var addComponents = function() {
    var obj = {};
    obj.showBookDetail = function (bookId, apiResponse) {
        var view = null;
        $('.content').text('');
        for (var i = 0; i < apiResponse.Books.length; i++) {
            if(apiResponse.Books[i].ID == bookId) {
                var modalDetail = $('#modal-template').html();
                view = {
                  "ID" : apiResponse.Books[i].ID,
                  "Description" : apiResponse.Books[i].Description,
                  "SubTitle" : apiResponse.Books[i].SubTitle,
                  "Title" : apiResponse.Books[i].Title,
                  "Image" : apiResponse.Books[i].Image,
                  "isbn" : apiResponse.Books[i].isbn
                };
            }
        }

        $.get('template/modalContainer.mustache', function(template) {
            var rendered = Mustache.render(template, view);
            console.log(rendered);
            $('.content').append(rendered);
        });
    };

    obj.createBookTile = function (resp) {
        var bookTile = '';
        $.get('template/bookTile.mustache', function(template) {
          for (var i = 0; i < resp.Books.length; i++) {
              bookTile = bookTile + Mustache.render(template, resp.Books[i]);
          }
            $('.books-container').append(bookTile);
        });
    }

    obj.addSubjectNames = function () {
        var view = {"subject": [{ "name": "PHP" }, { "name": "JQUERY" }, { "name": "AJAX" }, { "name": "JAVA" }, { "name": "ANDROID" }, { "name": "PYTHON" }, { "name": "MONGODB" }, { "name": "ANGULAR" }, { "name": "NODEJS" }, { "name": "BOOTSTRAP" }]}
        var subjectName = $('#subject-name').html();
        $.get('template/subjectSideBar.mustache', function(template) {
            var rendered = Mustache.render(template, view);
            $('.vertical-menu').append(rendered);
        });
    }
  return obj;
}
