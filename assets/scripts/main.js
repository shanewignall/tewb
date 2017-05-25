const $ = require('./bower_components/jquery/dist/jquery.min.js');
const API_KEY = 'AIzaSyAlE7vLt5dfjVSuRzfZGkp-Yud-sTf-kPI';
$('#search').keyup(function(e) {
  if (e.keyCode == 13) {
    search();
  }
});

function search() {
  var q = $('#search').val();
  $.get('https://www.googleapis.com/youtube/v3/search', {
    part: 'snippet, id',
    q: q,
    type: 'video',
    key: API_KEY
  }, function(res) {
    console.log(res.items);
    res.items.forEach(function(video) {
      appendResult(video);
    });
  });
}

function appendResult(video) {
  var id = video.id.videoId;
  var title = video.snippet.title;
  var thumb = video.snippet.thumbnails.high.url;
  var channel = video.snippet.channelTitle;
  var date = video.snippet.publishedAt;

  $('#results').append(
    '<div class="video">' +
     '<a href="https://www.youtube.com/watch?v=' + id + '">' +
       '<img class="thumb" src="' + thumb + '">' +
       '<span class="title"><h6>' + title + '<h6></span>' +
      '</a>' +
      '<span><p>' + channel + '<p></span>' +
      '<span><p>' + new Date(date).toDateString() + '<p></span>' +
    '</div>'
  )
}

$(window).on('resize', function() {
  $('#results').css('height', window.innerHeight - 60);
});
