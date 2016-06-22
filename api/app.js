var express   = require('express');
var app       = express();
var port      = process.env.PORT || 3000;
var morgan    = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var routes = require("./config/routes.js");
var mongoose = require('mongoose');
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var Location = require('./models/location');
// Location.collection.drop();

mongoose.connect('mongodb://localhost/project3');

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(methodOverride(function(req, res){

  if(req.body && typeof req.body === 'object' && '_method' in req.body) {

    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

io.on('connection', function(socket){
  console.log('a user connected');

  // var room = 'buddies';
  // socket.join(room);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message' , function(data) {
      //io.to('buddies').emit('chat message' , data);
      io.emit('chat message' , data);
  });

});



app.use("/api" , routes);


//THIS IS FOR LOCAL NODEMONNNNNNNNNNN
app.listen(port , function(){
  console.log("Listening on port " + port)
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
  // console.log(__dirname + '/public/index-copy-mishal.html')
});

// THIS IS FOR HEROKU SERVER
// var port = process.env.PORT;
// http.listen(port, function(){
//   console.log('listening on *:3000');
// });
