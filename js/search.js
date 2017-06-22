// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  //var q = $('#query').val();
  //console.log(gapi);
  q = 'surfing Goa';
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: '1',
    type: 'video',
    order: 'relevance',
    videoEmbeddable: 'true'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(response.result);
    var json = response.result;
    console.log(json.items[0].id.videoId);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}