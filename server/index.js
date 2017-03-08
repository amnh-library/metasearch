const API_BASE_URL = 'libcat1.amnh.org';
const API_KEY = process.env.SIERRA_API_KEY;
const API_SECRET = process.env.SIERRA_API_SECRET;

var sierra = require('sierra-api-client');
var request = require('request');
var express = require('express')
var app = express()
var extend = require('util')._extend;

app.set('domain', process.env.DEV_SEARCHSERVER_HOST);
app.set('port', process.env.DEV_SEARCHSERVER_PORT || process.env.DEV_SEARCHSERVER_ALTPORT);

sierra.configure({
    host: 'libcat1.amnh.org',
    port: 443,
    urlBase: 'iii/sierra-api'
});

function sierraQuery(field, term) {
    return {
        'target': {
            'record': {'type': 'bib'},
            'field': {'tag': field}
        },
        'expr': {
            'op': 'has',
            'operands': [term]
        }
    }
}

app.get('/sierra/query', function (req, res) {
    sierra.authenticate(API_KEY, API_SECRET, function (error, token) {
        request.post({
                url: sierra._buildURL('bibs/query'),
                auth: {
                    bearer: token
                },
                qs: {
                    limit: req.query.limit || 1,
                    offset: req.query.offset || 0,
                },
                body: JSON.stringify({
                    "queries": [
                        sierraQuery('t', req.query.term), "or",
                        sierraQuery('r', req.query.term), "or",
                        sierraQuery('a', req.query.term)
                    ]
                })
        }, function (error, response, body) {
            var ids = JSON.parse(body).entries.map(e => e.link.match(/\d+$/g)[0]);
            console.log(ids);
            sierra.request({
                method: 'GET',
                resource: 'bibs',
                params: {
                    id: ids.join(","),
                    fields: "varFields,id,title,author,materialType,publishYear"
                }
            }, function (error, response) {
                console.log(response);
                res.jsonp(response);
            });
        });
    });
})

app.get('/sierra/p/:sierra_url*', function (req, res) {
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

app.listen(app.get('port'), function () {
    console.log('app listening!')
})
