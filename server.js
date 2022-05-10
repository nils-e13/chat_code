//expressjs
const express = require('express');
const path = require("path");

// setup express application
const app = express();
const server = require("http").createServer(app);
let port = 3000;

//create new socket.io instance attached to the http server
const io = require("socket.io")(server);

var dateFormat = require('dateformat');
//const { SocketAddress } = require('net'); //not sure if needed

app.use(express.static(path.join(__dirname+'/public')));

//store messages + users here for now, but should be moved to classes
var messages = [];
var users = [];


server.listen(port, function () {
  console.log('listening on port: ' + port);
});


io.on('connection', function (socket) {
  console.log('a user connected'); //log when a user connects
  socket.on('disconnect', function(){
    console.log('user disconnected') //log when a user disconnects
  });

  socket.emit('init-chat', messages); //send all messages to new user

  socket.emit('update-users', users); //send all users to new user

  //when a user sends a message, server pushes the info to message list and emits an event 
  socket.on('send-message', function(data) {
    var newMessage = { text: data.message, user : data.user, date: dateFormat(new Date (), 'shortTime')};
    messages.push(newMessage);
    io.emit('read-message', newMessage);
  });

  //when new user connects, server pushes the info to user list and emits an event
  socket.on('add-user', function(user) {
    users.push({ id: socket.id, name: user });
    io.emit('update-users', users);
  });

  socket.on('disconnect', function() {
    users = users.filter(function(user) {
      return user.id != socket.id;
    });
    io.emit('update-users', users);
  });
});