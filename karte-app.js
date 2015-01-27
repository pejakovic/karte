var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var karatra = require('./karatra');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var clients = [];

io.on('connection', function(socket){
  console.log(socket.id);
  clients.push(socket.id);

  socket.on('start game', function(msg) {
    // cards visible to everybody
    io.emit('deck new shuffle', karatra.deal(20));
    clients.forEach(function(entry) {
      console.log(entry);
      io.to(entry).emit('deck new shuffle', karatra.deal(5));
    });
  });

  console.log('player joined');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
