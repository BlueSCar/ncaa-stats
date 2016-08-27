# ncaa-stats

- currently supports retrieving the following types of statistics:
    - individual stats
    - team stats
    - individual game highs
    - team game highs

# install
```shell
npm install ncaa-stats
```

# use
## Get sports data
```javascript
var ncaa = require('ncaa-stats');

// get all available sports
ncaa.sports.getSports(function(data) {
    console.log(data);
});

// get list of seasons for a particular sport (e.g. Men's Basketball')
ncaa.sports.getSeasons('MBB', function(data) {
    console.log(data);
});

// get list of divisions for a particular sport and season
ncaa.sports.getDivisions({
    sport: 'MFB', // Football
    season: '2017' // The 2016-2017 season
}, function(data) {
    console.log(data);
});

// get statistical categories and available ranking periods for a set of parameters
ncaa.sports.getSportDivisionData({
    sport: 'MFB', // Football
    season: 2016, // The season ending in 2016 (i.e. the 2015-2016 season)
    division: 11, // Division I FBS
    type: 'individual', // individual statistics
    gameHigh: false // regular statistics
}, function(data) {
    console.log(data);
});

ncaa.sports.getSportDivisionData({
    sport: 'MFB', // Football
    season: 2016, // The 2015-2016 season
    division: 12, // Division I FCS
    type: 'team', // team statistics
    gameHigh: true // game high statistics
}, function(data) {
    console.log(data);
});
```
## Get individual statistics
```javascript
var ncaa = require('ncaa-stats');

// get individual stats

ncaa.stats.getIndividualStats({
    sport: 'MFB', // Footbal
    division: '11', // Div I FBS
    category: '20' // All purpose yardage
        // defaults to most recent year and ranking period if none specified
}, function(data) {
    console.log(data);
});

// get individual game highs

ncaa.stats.getIndividualGameHighs({
    sport: 'MBB', // Men's Basketball
    division: '2', // Division II
    season: '2016', // The 2015-2016 season
    category: '612' // Field Goals Made
}, function(data) {
    console.log(data);
});
```
## Get team statistics
```javascript
var ncaa = require('ncaa-stats');

// get team statistics
ncaa.stats.getTeamStats({
    sport: 'MIH', // Men's Ice Hockey
    division: '3', // Division III
    season: '2015', // The 2014-2015 season
    category: '173' // Goal Against Average
}, function(data) {
    console.log(data);
});

// get team game highs
ncaa.stats.getTeamGameHighs({
    sport: 'WSO', // Women's Soccer
    division: '1', // Division I
    season: '2016', // The 2015-2016 season
    category: '746' // Attendance
}, function(data) {
    console.log(data);
});
```

# license
MIT