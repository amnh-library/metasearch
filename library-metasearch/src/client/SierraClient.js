import $ from 'jquery';
const API_BASE_URL = 'http://localhost:3001/sierra/';

function run(term) {
    return $.ajax({
        method: 'post',
        url: API_BASE_URL + "bibs/query",
        offset: 0,
        limit: 1,
        dataType: 'jsonp'
    }).then((data, textStatus, jqXHR) => {
        //return data;
        return null;
    });
}

export default {
    run: run
};
