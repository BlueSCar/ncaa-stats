var chai = require('chai');
var should = chai.should();

var app = require('../app/app');
var sports = app.sports;
var stats = app.stats;

describe('Sports', function() {
    it('should get the list of available sports', function(done) {
        sports.getSports().then((data) => {
            data.should.exist;
            data.should.be.json;

            data.sports.should.exist;
            data.sports.should.not.be.empty;

            done();
        });
    });

    it('should populate season data for the given sport', function(done) {
        sports.getSeasons('MFB', function(data) {
            data.should.exist;
            data.should.be.json;

            data.seasons.should.exist;
            data.seasons.should.not.be.empty;

            done();
        });
    });

    it('should populate division data for the given sport and season', function(done) {
        sports.getDivisions({
            sport: 'MFB',
            season: '2017'
        }, function(data) {
            data.should.exist;
            data.should.be.json;

            data.divisions.should.exist;
            data.divisions.should.not.be.empty;

            done();
        });
    });

    it('should populate ranking periods and statistical categories given a sport, season, and division', function(done) {
        sports.getSportDivisionData({
            sport: 'MFB',
            season: 2016,
            division: 11
        }, function(data) {
            data.should.exist;
            data.should.be.json;

            data.rankingsPeriods.should.exist;
            data.rankingsPeriods.should.not.be.empty;

            data.categories.should.exist;
            data.categories.should.not.be.empty;

            done();
        });
    });

    it('should populate ranking periods and statistical categories given a sport, season, and division', function(done) {
        sports.getSportDivisionData({
            sport: 'MFB',
            season: 2016,
            division: 11
        }, function(data) {
            data.should.exist;
            data.should.be.json;

            data.type.should.equal('individual');
            data.gameHigh.should.equal(false);

            data.rankingsPeriods.should.exist;
            data.rankingsPeriods.should.not.be.empty;

            data.categories.should.exist;
            data.categories.should.not.be.empty;

            done();
        });
    });

    it('should populate ranking periods and statistical categories given all specified options', function(done) {
        sports.getSportDivisionData({
            sport: 'MFB',
            season: 2016,
            division: 11,
            type: 'team',
            gameHigh: true
        }, function(data) {
            data.should.exist;
            data.should.be.json;

            data.rankingsPeriods.should.exist;
            data.rankingsPeriods.should.not.be.empty;

            data.categories.should.exist;
            data.categories.should.not.be.empty;

            done();
        });
    });
});

describe('Stats', function() {
    it('should return individual statistics for the given options', function(done) {
        stats.getIndividualStats({
            sport: 'MFB',
            division: '11',
            season: '2016',
            category: '20'
        }, function(data) {
            data.should.exist;
            data.should.be.json;

            data.players.should.exist;
            data.players.should.not.be.empty;

            done();
        });
    });

    it('should return individual game highs for the given options', function(done) {
        stats.getIndividualGameHighs({
            sport: 'MBB',
            division: '1',
            season: '2016',
            category: '612'
        }, function(data) {
            data.should.exist;
            data.should.be.json;

            data.players.should.exist;
            data.players.should.not.be.empty;

            done();
        });
    });

    it('should return team statistics for the given options', function(done) {
        stats.getTeamStats({
            sport: 'MIH',
            division: '3',
            season: '2015',
            category: '183'
        }, function(data) {
            data.should.exist;
            data.should.be.json;

            data.teams.should.exist;
            data.teams.should.not.be.empty;

            done();
        });
    });

    it('should return team game highs for the given options', function(done) {
        stats.getTeamGameHighs({
            sport: 'MSO',
            division: '2',
            season: '2016',
            category: '745'
        }, function(data) {
            data.should.exist;
            data.should.be.json;

            data.teams.should.exist;
            data.teams.should.not.be.empty;

            done();
        });
    });
});