var chai = require('chai');
var should = chai.should();

var app = require('../app/data.service');
var sports = require('../app/sports.service');

describe('Data', function() {
    /*it('should get the latest stats for the year', function(done) {
        this.timeout(5000);

        app.getStats({
            year: 2015,
            category: 13
        }, function(data) {
            data.should.exist;
            data.should.be.json;
            done();
        });
    });*/

    it('should get the specified stats', function(done) {
        this.timeout(5000);

        app.getStats({
            year: 2015,
            period: 5,
            division: 11,
            category: 13
        }, function(data) {
            data.should.exist;
            data.should.be.json;
            done();
        });
    });
});

describe('Sports', function() {
    it('should get the list of available sports', function(done) {
        sports.getSports(function(data) {
            data.should.exist;
            data.should.be.json;

            data.sports.should.exist;
            data.sports.should.not.be.empty;

            done();
        });
    });

    it('should populate division and season data for the given sport', function(done) {
        sports.getSportData('MFB', function(data) {
            data.should.exist;
            data.should.be.json;

            data.seasons.should.exist;
            data.seasons.should.not.be.empty;

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