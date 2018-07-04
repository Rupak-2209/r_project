var nextPageToken = null;
var url = null;
var indexOfRow = 0;
var countOfVideo = 1;

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT-EB9EpBmKKLcbXM13Kl-rdACR7WBEcM&part=snippet&maxResults=10&order=viewCount&q=" + document.getElementById('search-query').value + "&pageToken="+nextPageToken;
        apiCall();
    }
};

function submitData() {
    indexOfRow = 0;
    countOfVideo = 1;
    var searchedText = document.getElementById("search-query").value;
    url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT-EB9EpBmKKLcbXM13Kl-rdACR7WBEcM&part=snippet&maxResults=10&q=" +searchedText;
    apiCall();
}

(function() {
    url = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCT-EB9EpBmKKLcbXM13Kl-rdACR7WBEcM&part=snippet&maxResults=10&q=sports+news";
    apiCall();
})();

function apiCall() {
    var httpReq = new XMLHttpRequest();
    httpReq.open("Get", url, true);
    httpReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            displayVideo(httpReq);
        }
    }
    httpReq.send();
}

function displayVideo(httpReq) {
    var  parsedResponse = JSON.parse(httpReq.responseText);
    nextPageToken = parsedResponse.nextPageToken;
    if( document.getElementsByClassName('videos')[indexOfRow] == undefined) {
        var newRow = document.createElement('div');
        newRow.setAttribute('class', 'row videos');
        var videoContainer = document.getElementById('video-container');
        videoContainer.appendChild(newRow);
    }
    var temp = countOfVideo;
    for(; countOfVideo <= parsedResponse.items.length + temp; countOfVideo++) {
        document.getElementsByClassName("videos")[indexOfRow].innerHTML += "<div class='col-md-3 col-xs-6 col-sm-4 video-tile'>\
                                                                <div class='image'><img src='" +parsedResponse.items[(countOfVideo-1) % 10].snippet.thumbnails.medium.url+ "' alt='cannot display' class='fetched-image'/>\
                                                                </div>\
                                                                <div class='title'>" +parsedResponse.items[(countOfVideo-1) % 10].snippet.title+ "\
                                                                </div>\
                                                                <div class='description'>" +parsedResponse.items[(countOfVideo-1) % 10].snippet.description+"\
                                                                </div>\
                                                            </div>";
        if((countOfVideo > 1) && (countOfVideo % 4) == 0) {
            var newRow = document.createElement('div');
            newRow.setAttribute('class', 'row videos');
            var videoContainer = document.getElementById('video-container');
            videoContainer.appendChild(newRow);
            indexOfRow++;
        }
    }

}
