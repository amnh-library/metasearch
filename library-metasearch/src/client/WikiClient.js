import $ from 'jquery';

var API_WIKI_BASE = 'http://en.wikipedia.org/w/api.php';

function wikiGet(data) {
  return $.ajax({
    url: API_WIKI_BASE,
    dataType: 'jsonp',
    jsonp: 'callback',
    data: data,
    xhrFields: { withCredentials: true },
  });
}

// this API is bizarre
function getFirstField(obj) {
  return obj[Object.keys(obj)[0]];
}

function run(term) {
  return wikiGet(
    {'action': 'query', 'format': 'json', 'list': 'search', 'srsearch': term}
  ).then(function (data, textStatus) {
    if (data.query.search.length === 0) {
      return {}
    }

    var top_hit = data.query.search[0];
    var wiki_title = top_hit.title.split(' ').join('_')

    return wikiGet(
      {'action': 'query', 'prop': 'images|categories', 'format': 'json', 'titles': wiki_title}
    ).then(function(data, textStatus) {
      if (data.query.pages.length === 0) {
        return {}
      }

      var pages = data.query.pages;
      var top_page = getFirstField(pages);
      var cleaned_snippet = top_hit.snippet.replace(/(<([^>]+)>)/ig,"");

      var base_data = {
        title: top_hit.title,
        categories: top_page.categories,
        page_url: 'http://en.wikipedia.org/wiki/' + wiki_title,
        snippet: cleaned_snippet,
      };

      if (top_page.images && top_page.images.length > 0) {
        var image_title = top_page.images[0].title;

        return wikiGet(
          {'action': 'query', 'titles': image_title, 'prop': 'imageinfo', 'iiprop': 'url', 'format': 'json'}
        ).then(function(data, textStatus) {
          var url = getFirstField(data.query.pages).imageinfo[0].url;
          return $.extend(base_data, {image_url: url});
        });
      } else {
        return base_data;
      }
    });
  });
}

export default {
    run: run
};
