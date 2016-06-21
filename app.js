var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/frontend/chat.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  var room = 'buddies';
  socket.join(room);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message' , function(data) {
      io.to('buddies').emit('chat message' , data);
  });

});

var port = process.env.PORT;
http.listen(port, function(){
  console.log('listening on *:3000');
});