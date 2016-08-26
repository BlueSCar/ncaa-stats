var request = require('request');
var cheerio = require('cheerio');
var tabletojson = require("tabletojson");

exports.getStats = function(options, callback){
    var baseUrl = 'http://stats.ncaa.org/rankings/national_ranking';
    var queryParams = {
        academic_year: options.year,
        division: options.division || 11,
        sport_code: 'MFB',
        stat_seq: options.category,
        ranking_period: options.period || 0
    };

    if (!queryParams.ranking_period) {
        getLatestRankingPeriod(baseUrl, queryParams, callback);
    } else {
        requestStats(baseUrl, queryParams, true, callback);
    }
};

var getLatestRankingPeriod = function(baseUrl, queryParams, callback){
    queryParams.ranking_period += 1;

    requestStats(baseUrl, queryParams, false, function(data){
        var $ = cheerio.load(data);

        var option = $('#rp');

        queryParams.ranking_period = option.prop('value');

        requestStats(baseUrl, queryParams, true, callback);
    });
};

var requestStats = function(baseUrl, queryParams, toJson, callback){
    request({
        url: baseUrl,
        qs: queryParams
    }, function(error, response, body){
        if (!error) {
            var data = toJson ? tabletojson.convert(body)[1] : body;

            callback(data);
        }
    });
}