var rp = require('request-promise');
var cheerio = require('cheerio');
var decode = require('decode-html');
var tabletojson = require("tabletojson");

var requestData = function (options) {
    var baseUrl = 'http://stats.ncaa.org/rankings/change_sport_year_div';

    return rp({
        url: baseUrl,
        method: 'POST',
        formData: {
            "sport_code": options.sport,
            "academic_year": options.season || '',
            "division": options.division || '',
            "ranking_period": options.rankingPeriod || '',
            "team_individual": options.type || '',
            "game_high": options.gameHigh,
            "ranking_summary": "N",
            "org_id": "-1",
            "stat_seq": options.category,
            "conf_id": "-1",
            "region_id": "-1",
            "ncaa_custom_rank_summary_id": "-1",
            "user_custom_rank_summary_id": -1
        }
    });
};

var createPlayerData = function (body) {
    var data = {
        players: []
    };

    var playerRegExp = /^(.+), (.+) \((.+)\)$/;
    var $ = cheerio.load(body);

    tabletojson.convert(body)[1].forEach(function (item) {
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

var createTeamData = function (body) {
    var data = {
        teams: []
    };

    var teamRegExp = /^(.+) \((.+)\)$/;
    var $ = cheerio.load(body);

    tabletojson.convert(body)[1].forEach(function (item) {
        var match = teamRegExp.exec(item.Team);

        if (match) {
            item.Team = match[1];
            item.Conference = match[2];

            data.teams.push(item);
        }
    });

    return data;
};

exports.getIndividualStats = function (options, callback) {
    options.type = 'I';
    options.gameHigh = 'N';

    var promise = requestData(options).then((body) => {
        return createPlayerData(body);
    });

    return callback ? promise.then(callback) : promise;
};

exports.getIndividualGameHighs = function (options, callback) {
    options.type = 'I';
    options.gameHigh = 'Y';

    var promise = requestData(options).then(body => {
        return createPlayerData(body);
    });

    return callback ? promise.then(callback) : promise;
};

exports.getTeamStats = function (options, callback) {
    options.type = 'T';
    options.gameHigh = 'N';

    var promise = requestData(options).then((body) => {
        return createTeamData(body);
    });

    return callback ? promise.then(callback) : promise;
};

exports.getTeamGameHighs = function (options, callback) {
    options.type = 'T';
    options.gameHigh = 'Y';

    var promise = requestData(options).then((body) => {
        return createTeamData(body);
    });

    return callback ? promise.then(callback) : promise;
};