var id = null;
var title = null;
var description = null;
var image = null;
var nextPageToken = null;
var url = null;

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        var httpReq = new XMLHttpRequest();
        var url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT-EB9EpBmKKLcbXM13Kl-rdACR7WBEcM&part=snippet&maxResults=10&order=viewCount&q=" + document.getElementById('text').value + "&pageToken="+nextPageToken;
        display(httpReq, url);
    }
};

function submitData() {
    document.getElementById('video-container').innerHTML = '';
    var searchedText = document.getElementById("text").value;
    var httpReq = new XMLHttpRequest();
    url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT-EB9EpBmKKLcbXM13Kl-rdACR7WBEcM&part=snippet&maxResults=10&q=" +searchedText;
    display(httpReq, url);
}

(function() {
    var httpReq = new XMLHttpRequest();
    url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT-EB9EpBmKKLcbXM13Kl-rdACR7WBEcM&part=snippet&maxResults=10&q=sports+news";
    display(httpReq, url);
})();

function display(httpReq1, url1) {
    httpReq1.open("Get", url1, true);
    httpReq1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            nextPageToken = myObj.nextPageToken;
            for(var i = 0; i < 8; i++){
            document.getElementById("video-container").innerHTML += "<div class='videoInfo'>\
                                                              <div class='image'><center><img src='" +myObj.items[i].snippet.thumbnails.medium.url+ "' alt='cannot display' class='fetchedImage'/><center>\
                                                              </div>\
                                                              <div class='title'>" +myObj.items[i].snippet.channelTitle+ "\
                                                              </div>\
                                                              <div class='description'>" +myObj.items[i].snippet.description+"\
                                                              </div>\
                                                          </div>";
            }
        }
    }
    httpReq1.send();
}
