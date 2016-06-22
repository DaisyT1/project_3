var express   = require('express');
var app       = express();
var port      = process.env.PORT || 3000;
var morgan    = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var routes = require("./config/routes.js");
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost/project3');
// var User = require('./models/user'); 
// User.collection.drop();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(methodOverride(function(req, res){

  if(req.body && typeof req.body === 'object' && '_method' in req.body) {

    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(morgan('dev'));

app.use("/api" , routes);

app.listen(port , function(){

  console.log("Listening on port " + port)

});
