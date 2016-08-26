var app = require('./app/data.service.js');

app.getStats({
            year: 2015,
            category: 13
        }, function(data){
            data.should.exist;
            data.should.be.json;
            done();
        });

module.exports = app;