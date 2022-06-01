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
  constructor (user, userID) {
      this._user = user;
      this._userID = userID;
  }

}

class Message {
  constructor (text, user, userID) {
      this._text = text;
      this._user = user;
      this._userID = userID;
      //this._date = date;
  }


}


//test with classes
let classesMessagesArray = [];
console.log("this is classesMessagesArray:")
console.log(classesMessagesArray);

//array to store all users
let classesUsersArray = [];
console.log("this is classesUsersArray:")
console.log(classesUsersArray);


server.listen(port, function () {
  console.log('listening on port: ' + port);
});


io.on('connection', function (socket) {
  console.log('a user connected'); //log when a user connects
  socket.on('disconnect', function(){
    console.log('user disconnected') //log when a user disconnects
  });



  socket.emit('init-chat', classesMessagesArray); //send all messages to new user
  
  socket.emit('init-users', classesUsersArray); //send all users to new user



  //when a user sends a message, server pushes the info to message list and emits an event 
  socket.on('send-message', function(data) { //data is the message content, server receives send message from client and pushes to message list
    // let newMessage = { text: data.message, user: data.user, /*date: dateFormat(new Date (), 'shortTime')*/}; //create new message object
    
    //test with classes
    let newMessageClasses = new Message(data.message, data.user, data.userID);//takes message content and user from app emit and also adds socket.id to message all according to classes blueprint Messages
    classesMessagesArray.push(newMessageClasses);
    //console.log(newMessageClasses);
    
    //socket.broadcast.emit('read-message', newMessageClasses); //send message to all users except the sender
    io.sockets.emit('read-message', classesMessagesArray);
    //io.sockets.emit('read-message', newMessageClasses); //send message to all users including the sender
  });

  

  //when new user connects, server pushes the info to user list and emits an event
  socket.on('add-user', function(data) {
    let newUsersClasses = new User(data.user, data.userID); //create new user object
    classesUsersArray.push(newUsersClasses);
    //console.log(newUsersClasses);
    io.sockets.emit('update-users', classesUsersArray); //users array is updated and pushed to all users
  });

  //when user disconnects, server pushes the info to user list and emits an event
  // socket.on('disconnect', function() {
  //   classesUsersArray = classesUsersArray.filter(function(user) {
  //     return classesUsersArray.userID != socket.id;
  //   });
  //   io.emit('update-users', classesUsersArray);
  // });
});