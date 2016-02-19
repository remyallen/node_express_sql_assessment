var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
    res.send({message: 'hello'});
});

router.post('/', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});



module.exports = router;