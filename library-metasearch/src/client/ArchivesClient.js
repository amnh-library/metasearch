import $ from 'jquery';

function run(term) {
  return $.ajax({
    url: 'http://localhost:3002/api/v1/resources/archives-space',
    dataType: 'json',
    data: {q:term},
  }).then(function (data, textStatus) {
    if (data.results && data.results.length > 0) {
      return data.results.slice(0,3).map( function(result) {
        return {
          title: result['title'],
          url: 'http://lbry-web-006.amnh.org:8081' + result['uri'],
        };
      });
    }
    return {};
  });
}

export default {
  run: run,
};
