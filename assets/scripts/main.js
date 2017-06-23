const $ = require('./bower_components/jquery/dist/jquery.min.js');
const API_KEY = 'AIzaSyAlE7vLt5dfjVSuRzfZGkp-Yud-sTf-kPI';

$('#search').keyup(function(e) {
  if (e.keyCode == 13) {
    search();
  }
});

var nextPageToken;

function search() {
  $('#results').empty();
  var q = $('#search').val();
  $.get('https://www.googleapis.com/youtube/v3/search?maxResults=20', {
    part: 'snippet, id',
    q: q,
    type: 'video',
    key: API_KEY
  }, function(res) {
    nextPageToken = res.nextPageToken;
    res.items.forEach(function(video) {
      appendResult(video);
    });
  });
}

function play(id) {
  $('.video-wrapper').remove();
  $('body').prepend('<div class="video-wrapper"><iframe class="iframe" width="560" height="315" src="https://www.youtube.com/embed/' + id +'" frameborder="0" allowfullscreen></iframe><button class="back" onclick="back()">Back</button></div>');
  window.resizeTo(560 + window.outerWidth - window.innerWidth, 315 + window.outerHeight - window.innerHeight);
}

function back() {
  $('.video-wrapper').remove();
  window.resizeTo(450, 600);
}

function nextPage(token) {

  var q = $('#search').val();
  $.get('https://www.googleapis.com/youtube/v3/search?maxResults=20', {
    part: 'snippet, id',
    q: q,
    type: 'video',
    key: API_KEY,
    pageToken: token
  }, function(res) {
    nextPageToken = res.nextPageToken;
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
     '<a href="#" id="' + id + '?autoplay=1" onclick="play(this.id)">' +
       '<img class="thumb" src="' + thumb + '">' +
       '<span class="title"><h6>' + title + '<h6></span>' +
      '</a>' +
      '<span><p>' + channel + '<p></span>' +
      '<span><p>' + new Date(date).toDateString() + '<p></span>' +
    '</div>'
  );
}

$('#results').scroll(function() {
  if($('#results').scrollTop() + $('#results').innerHeight() >= $('#results')[0].scrollHeight) {
    nextPage(nextPageToken);
  }
});

$(window).on('resize', function() {
  $('#results').css('height', window.innerHeight - 60);
  if($('iframe').length) {
    $('body').css('height', window.innerHeight);
    $('.back').css('margin-top', $('iframe').height() - 85 + 'px');
    $('.back').css('margin-left', $('iframe').width() - 72 + 'px');
  } else {
    $('body').css('height', '100%');
  }
});

$(window).on('mouseenter', function() {
  $('.back').stop().fadeIn('fast');
});

$(window).on('mouseleave', function() {
  $('.back').stop().fadeOut('fast');
});

$(function() {
  $('#results').css('height', window.innerHeight - 60);
});
