import $ from 'jquery';

if (process.env.REACT_APP_ENVIRONMENT === 'development') {
  const API_BASE_URL = 'http://api-dev.library.amnh.org/api/v1/resources/sierra';
} else {
  const API_BASE_URL = 'http://api.library.amnh.org/api/v1/resources/sierra';
}

app.listen(process.env.REACT_APP_PORT);

function run(term) {
    return $.ajax({
        method: 'get',
        url: API_BASE_URL + "query",
        data: {
            offset: 0,
            limit: 5,
            term: term,
        },
        dataType: 'jsonp'
    }).then((data, textStatus, jqXHR) => {
        return data;
    });
}

export default {
    run: run
};
