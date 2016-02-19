var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//var data = require('./routes/data');
var math = require('./routes/math');

var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/zoo';
}

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);

//app.use('/data', data);
app.use('/math', math);

app.get('/animal', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM animal ORDER BY id DESC;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            done();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

app.post('/animal', function(req, res) {
    var addAnimal = {
        animal_type: req.body.animal_type,
        animal_number: req.body.animal_number

    };

    pg.connect(connectionString, function(err, client, done) {
        client.query("INSERT INTO animal (animal_type, animal_number) VALUES ($1, $2) " +
            "RETURNING id",
            [addAnimal.animal_type, addAnimal.animal_number],
            function (err, result) {
                done();
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });

});

app.get('/*', function(req, res) {
    console.log("Here is the request: " , req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public/', file));
});


app.listen(app.get('port'), function() {
    console.log('Server is ready on port ' + app.get('port'));
});