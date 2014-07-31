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

app.get('/boxes', function(req, res){
  res.render('box1');
});

app.post('/boxes', function(req, res){
  var numBox = parseInt(req.body.box);
  var widths = req.body.width.split('-').map(function(x){return x * 1;});
  var heights = req.body.height.split('-').map(function(x){return x * 1;});
  var colors = req.body.color.split(',');

  console.log(numBox,widths,heights,colors);

  var boxes = [], index;

  for(var i = 0; i < numBox; i++){
    var box = {};
    box.width = Math.floor(Math.random() * (widths[1] - widths[0] + 1)) + widths[0];
    box.height = Math.floor(Math.random() * (heights[1] - heights[0] + 1)) + heights[0];
    index = Math.floor(Math.random() * colors.length);
    box.color = colors[index];

    boxes.push(box);
  }

  res.render('box2', {boxes:boxes});
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT:', port);
});
