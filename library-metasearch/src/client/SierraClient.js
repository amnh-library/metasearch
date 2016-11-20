import $ from 'jquery';
const API_BASE_URL = 'https://fast-refuge-26073.herokuapp.com/sierra/';

function run(term) {
    return $.ajax({
        method: 'get',
        url: API_BASE_URL + "query",
        data: {
            offset: 0,
            limit: 2,
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
