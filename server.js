//expressjs
const express = require('express');
const path = require("path");

// setup express application
const app = express();
const server = require("http").createServer(app);
let port = 3000;

//create new socket.io instance attached to the http server
const io = require("socket.io")(server);

//import dateformat
const dateFormat = import('dateformat');
//var dateFormat = require('dateformat');
//const { SocketAddress } = require('net'); //not sure if needed

app.use(express.static(path.join(__dirname+'/public')));




//classes for oop
class Chat {
  constructor (uid) {
      this._uid = uid;
      //this.messages
      //this.sender
      //this.receiver
  
  }
  
}

class User {
  constructor (name) {
      this._name = name;
      
  }

}

class Message {
  constructor (text, user) {
      this._text = text;
      this._user = user;
      //this._date = date;
  }


}


//test with classes
let classesMessagesArray = [];
console.log("this is classesMessagesArray:")
console.log(classesMessagesArray);






//store messages + users here for now, but should be moved to classes
let serverMessagesArray = [];
var users = [];

server.listen(port, function () {
  console.log('listening on port: ' + port);
});


io.on('connection', function (socket) {
  console.log('a user connected'); //log when a user connects
  socket.on('disconnect', function(){
    console.log('user disconnected') //log when a user disconnects
  });

  socket.emit('init-chat', serverMessagesArray); //send all messages to new user

  socket.emit('update-users', users); //send all users to new user

  //when a user sends a message, server pushes the info to message list and emits an event 
  socket.on('send-message', function(data) { //data is the message content, server receives send message from client and pushes to message list
    // let newMessage = { text: data.message, user: data.user, /*date: dateFormat(new Date (), 'shortTime')*/}; //create new message object
    // let new users = new user { }... so ca für classes
    // serverMessagesArray.push(newMessage); //pushes newMessage object to end of messages array
    
    //test with classes
    let newMessageClasses = new Message(data.message, data.user);
    classesMessagesArray.push(newMessageClasses);
    console.log(newMessageClasses);
    

    
    socket.broadcast.emit('read-message', newMessageClasses); //send message to all users except the sender
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