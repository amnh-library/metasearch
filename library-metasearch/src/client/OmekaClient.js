import $ from 'jquery';

const API_BASE_URL = 'http://api.library.amnh.org/api/v1/images';
const MAX_RESULTS = 4;

if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  API_BASE_URL = 'http://api-dev.library.amnh.org/api/v1/images';
}

function run(term) {
  return $.ajax({
    url: API_BASE_URL,
    data: {q:term},
  }).then(function (data, textStatus) {
    if (data && data.length > 0) {
      return data.slice(0,MAX_RESULTS).map( function(result) {
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
