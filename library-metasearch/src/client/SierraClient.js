import $ from 'jquery';
const API_BASE_URL = 'http://api-dev.library.amnh.org/api/v1/resources/sierra';

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
