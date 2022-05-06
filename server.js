/*
// ExpressJS
const express = require("express");
// Kommt von Haus aus mit NodeJS, bringt nützliche Funktionen um mit dem File System zu arbeiten
const path = require("path");

// Hier wird der Server auf dem Port 3000 gestartet (local)
const app = express();
const server = require("http").createServer(app);
var port = 3000;

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

// Server "hört" auf den Port der oben festgelegt wurde
server.listen(port);

// Listening to connections and define the events
io.on('connection', function (socket) {
  console.log( "Connection from client " + socket.id );

  socket.emit( "greeting", "Hello Client" );

  socket.on( "message", function( message ) {
  console.log("Message from client: " + message);
});
});

*/


const express = require('express');
const path = require("path");

// setup express application
const app = express();
const server = require("http").createServer(app);
let port = 3000;

//create new socket.io instance attached to the http server
const io = require("socket.io")(server);


app.use(express.static(path.join(__dirname+'/public')));

server.listen(port, function () {
  console.log('listening on port: ' + port);
});


io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected')
  });
});



io.on('connection', function (socket) {
  socket.on('chatMessage', function (msg) {
    console.log('message: ' + msg);
  });
});