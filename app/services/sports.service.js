var request = require('request');
var cheerio = require('cheerio');
var decode = require('decode-html');

var extractSelectList = function($, array, id) {
    var selector = '#' + id + ' option';
    $(selector).each(function() {
        var value = $(this).prop('value');
        var name = decode($(this).html());

        if (value) {
            array.push({
                value: value,
                name: name
            });
        }
    });
};

exports.getSports = function(callback) {
    var baseUrl = 'http://stats.ncaa.org/';

    request(baseUrl, function(err, response, body) {
        if (err) {
            console.error(err);
        }

        if (response.statusCode == 200) {
            var data = {
                sports: []
            };

            var $ = cheerio.load(body);
            extractSelectList($, data.sports, 'sport');

            callback(data);
        }
    });
};

exports.getSeasons = function(sport, callback) {
    var baseUrl = 'http://stats.ncaa.org/rankings/change_sport_year_div';
    var requestBody = 'sport_code=' + sport + '&academic_year=&division=&ranking_period=&team_individual=&game_high=&ranking_summary=N&org_id=-1&stat_seq=&conf_id=-1&region_id=-1&ncaa_custom_rank_summary_id=-1&user_custom_rank_summary_id=-1';

    request.post({
        url: baseUrl,
        body: requestBody
    }, function(error, response, body) {
        if (error) {
            console.error(err);
        }

        if (response.statusCode == 200) {
            var data = {
                seasons: []
            };

            var $ = cheerio.load(body);

            extractSelectList($, data.seasons, 'acadyr');
            //extractSelectList($, data.divisions, 'u_div');

            callback(data);
        }
    });
};

exports.getDivisions = function(options, callback){
    if (!options.sport || !options.season) {
        return;
    }

    var baseUrl = 'http://stats.ncaa.org/rankings/change_sport_year_div';
    var requestBody = 'sport_code=' + options.sport + '&academic_year=' + options.season + '&division=&ranking_period=&team_individual=&game_high=&ranking_summary=N&org_id=-1&stat_seq=&conf_id=-1&region_id=-1&ncaa_custom_rank_summary_id=-1&user_custom_rank_summary_id=-1';

    request.post({
        url: baseUrl,
        body: requestBody
    }, function(error, response, body) {
        if (error) {
            console.error(err);
        }

        if (response.statusCode == 200) {
            var data = {
                divisions: []
            };

            var $ = cheerio.load(body);
            
            extractSelectList($, data.divisions, 'u_div');

            callback(data);
        }
    });
};

exports.getSportDivisionData = function(options, callback) {
    if (!options.sport || !options.season || !options.division) {
        return;
    }

    options.type = options.type || 'individual';
    options.gameHigh = options.gameHigh || false;

    var rankingType = options.type == 'team' ? 'T' : 'I';
    var isGameHigh = options.gameHigh == true ? 'Y' : 'N';

    var baseUrl = 'http://stats.ncaa.org/rankings/change_sport_year_div';
    var requestBody = 'sport_code=' + options.sport + '&academic_year=' + options.season + '&division=' + options.division + '&ranking_period=&team_individual=' + rankingType + '&game_high=' + isGameHigh + '&ranking_summary=N&org_id=-1&stat_seq=&conf_id=-1&region_id=-1&ncaa_custom_rank_summary_id=-1&user_custom_rank_summary_id=-1';

    request.post({
        url: baseUrl,
        body: requestBody
    }, function(error, response, body) {
        if (error) {
            console.error(err);
        }

        if (response.statusCode == 200) {
            var data = {
                sport: options.sport,
                season: options.season,
                division: options.division,
                type: options.type,
                gameHigh: options.gameHigh,
                rankingsPeriods: [],
                categories: []
            };

            var $ = cheerio.load(body);

            extractSelectList($, data.rankingsPeriods, 'rp');
            extractSelectList($, data.categories, 'Stats');

            callback(data);
        }
    });
}