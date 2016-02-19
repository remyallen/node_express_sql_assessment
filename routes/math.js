var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

var math = function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
};

router.post('/', function(req, res) {
    console.log(req.body);
    var number = math(1 , 100);
    res.send(number.toString());
});



module.exports = router;

