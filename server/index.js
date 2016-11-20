const API_BASE_URL = 'libcat1.amnh.org';
const API_KEY = 'Z7C5m/M14Uj5gpVwGvPJerotKkt8';
const API_SECRET = '4kYjKCaiyJang3n7FmuPUt';

var sierra = require('sierra-api-client');

var express = require('express')
var app = express()
var extend = require('util')._extend;

sierra.configure({
    host: 'libcat1.amnh.org',
    port: 443,
    urlBase: 'iii/sierra-api'
});

app.get('/sierra/:sierra_url*', function (req, res) {
    var sierra_params = extend({}, req.query);
    delete sierra_params.callback;
    delete sierra_params._;
    console.log(sierra_params);
    sierra.authenticate(API_KEY, API_SECRET, function (error, token) {
        sierra.request({
            method: 'GET',
            resource: req.params['sierra_url'],
            params: sierra_params
        }, function (error, response) {
            res.jsonp(response);
        });
    });
})

app.post('/sierra/:sierra_url*', function (req, res) {
    sierra.authenticate(API_KEY, API_SECRET, function (error, token) {
        sierra.request({
            method: 'POST',
            resource: req.params['sierra_url'],
            data: req.body
        }, function (error, response) {
            res.jsonp(response);
        });
    });
})

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})

function testResponseHandler (error, result) {
    if (error) {
        console.log(error);
        return;
    }

    console.log(result);
}
