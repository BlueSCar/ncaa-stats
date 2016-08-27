var request = require('request');
var cheerio = require('cheerio');
var decode = require('decode-html');
var tabletojson = require("tabletojson");

var requestData = function(options, callback) {
    var baseUrl = 'http://stats.ncaa.org/rankings/change_sport_year_div';
    var requestBody = 'sport_code={{sport}}&academic_year={{season}}&division={{division}}&ranking_period={{rankingPeriod}}&team_individual={{type}}&game_high={{gameHigh}}&ranking_summary=N&org_id=-1&stat_seq={{category}}&conf_id=-1&region_id=-1&ncaa_custom_rank_summary_id=-1&user_custom_rank_summary_id=-1';

    requestBody = requestBody
        .replace('{{sport}}', options.sport)
        .replace('{{season}}', options.season || '')
        .replace('{{division}}', options.division || '')
        .replace('{{rankingPeriod}}', options.rankingPeriod || '')
        .replace('{{type}}', options.type || '')
        .replace('{{gameHigh}}', options.gameHigh || '')
        .replace('{{category}}', options.category);

    request.post({
        url: baseUrl,
        body: requestBody
    }, function(error, response, body) {
        if (error) {
            console.error(err);
        }

        if (response.statusCode == 200) {
            callback(body);
        }
    });
};

var createPlayerData = function(body) {
    var data = {
        players: []
    };

    var playerRegExp = /^(.+), (.+) \((.+)\)$/;
    var $ = cheerio.load(body);

    tabletojson.convert(body)[1].forEach(function(item) {
        var match = playerRegExp.exec(item.Player);

        if (match && item.Ranking != '-') {
            item.Player = match[1];
            item.School = match[2];
            item.Conference = match[3];

            data.players.push(item);
        }
    });

    return data;
};

var createTeamData = function(body) {
    var data = {
        teams: []
    };

    var teamRegExp = /^(.+) \((.+)\)$/;
    var $ = cheerio.load(body);

    tabletojson.convert(body)[1].forEach(function(item) {
        var match = teamRegExp.exec(item.Team);

        if (match) {
            item.Team = match[1];
            item.Conference = match[2];

            data.teams.push(item);
        }
    });

    return data;
};

exports.getIndividualStats = function(options, callback) {
    options.type = 'I';
    options.gameHigh = 'N';

    requestData(options, function(body) {
        var data = createPlayerData(body);
        callback(data);
    })
};

exports.getIndividualGameHighs = function(options, callback) {
    options.type = 'I';
    options.gameHigh = 'Y';

    requestData(options, function(body) {
        var data = createPlayerData(body);
        callback(data);
    })
};

exports.getTeamStats = function(options, callback) {
    options.type = 'T';
    options.gameHigh = 'N';

    requestData(options, function(body) {
        var data = createTeamData(body);
        callback(data);
    })
};

exports.getTeamGameHighs = function(options, callback) {
    options.type = 'T';
    options.gameHigh = 'Y';

    requestData(options, function(body) {
        var data = createTeamData(body);
        callback(data);
    })
};