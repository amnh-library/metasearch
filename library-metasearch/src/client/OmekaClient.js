import $ from 'jquery';

const MAX_RESULTS = 4;

function run(term) {
  return $.ajax({
    url: 'http://10.20.40.218:3000/api/v1/images/',
    data: {q:term},
  }).then(function (data, textStatus) {
    if (data && data.length > 0) {
      return data.slice(0,MAX_RESULTS).map( function(result) {
        console.log(result);
        return {
          url: result,
        };
      });
    }
    return {};
  });
}

export default {
  run: run,
};
