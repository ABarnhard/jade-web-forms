'use strict';

var express = require('express');
var app = express();
var morgan  = require('morgan');
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/calc', function(req, res){
  res.render('calc');
});

app.post('/calc', function(req, res){
  var x = req.body.x * 1, y = req.body.y * 1, result, opN, eql = ' = ';
  switch(req.body.op){
    case '+':
      result = x + y;
      opN = 'Sum ';
      break;
    case '-':
      result = x - y;
      opN = 'Subtract ';
      break;
    case '*':
      result = x * y;
      opN = 'Multiply ';
      break;
  case '/':
      result = x / y;
      opN = 'Divide ';
  }

  res.render('calc', {eql:eql,opN:opN,op:' '+req.body.op+' ',res:result, x:req.body.x, y:req.body.y});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT:', port);
});
