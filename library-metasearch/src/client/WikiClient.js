import $ from 'jquery';

function run(term) {
  return $.ajax({
    url: 'http://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    jsonp: 'callback',
    data: {'action': 'query', 'format': 'json', 'list': 'search', 'srsearch': term},
    xhrFields: { withCredentials: true },
  }).then(function (data, textStatus) {
    console.log(data.query.search);
    return {
      titles: data.query.search.map(function(hit) {
        return hit.title;
      })
    };
  });
}

export default {
    run: run
};
