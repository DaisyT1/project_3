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

// var User = require('./models/user');
// User.collection.drop();

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/project3');

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
      //socket.broadcast.emit('chat message' , data);
  });

});



app.use("/api" , routes);

// //THIS IS FOR LOCAL NODEMONNNNNNNNNNN
// app.listen(port , function(){
//   console.log("Listening on port " + port)
// });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
  // console.log(__dirname + '/public/index-copy-mishal.html')
});

//THIS IS FOR HEROKU SERVER
var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:3000');
});

// //THIS IS FOR HEROKU SERVER
// var port = process.env.PORT;
// http.listen(port, function(){
//   console.log('listening on *:3000');
// });



// // sending to sender-client only
//  socket.emit('message', "this is a test");

//  // sending to all clients, include sender
//  io.emit('message', "this is a test");

//  // sending to all clients except sender
//  socket.broadcast.emit('message', "this is a test");

//  // sending to all clients in 'game' room(channel) except sender
//  socket.broadcast.to('game').emit('message', 'nice game');

//  // sending to all clients in 'game' room(channel), include sender
//  io.in('game').emit('message', 'cool game');

//  // sending to sender client, only if they are in 'game' room(channel)
//  socket.to('game').emit('message', 'enjoy the game');

//  // sending to all clients in namespace 'myNamespace', include sender
//  io.of('myNamespace').emit('message', 'gg');

//  // sending to individual socketid
//  socket.broadcast.to(socketid).emit('message', 'for your eyes only');
