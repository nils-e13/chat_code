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
  constructor (text, user, userID, to) {
      this._text = text;
      this._user = user;
      this._userID = userID;
      this._to = to;
      //this._date = date;
  }


}


//array to store messages
let classesMessagesArray = [];

//array to store private messages
let classesPrivateMessagesArray = [];

//array to store all users
let classesUsersArray = [];


server.listen(port, function () {
  console.log('listening on port: ' + port);
});


io.on('connection', function (socket) {
  console.log('a user connected'); //log when a user connects
  socket.on('disconnect', function(){
    console.log('user disconnected') //log when a user disconnects
  });



  socket.emit('init-chat', classesMessagesArray); //send all messages to new user

  socket.emit('init-private-chat', classesPrivateMessagesArray); //send all private messages to new user
  
  socket.emit('init-users', classesUsersArray); //send all users to new user



  //when a user sends a message, server pushes the info to message list and emits an event 
  socket.on('send-message', function(data) { //data is the message content, server receives send message from client and pushes to message list
    let newMessageClasses = new Message(data.message, data.user, data.userID);//takes message content and user from app emit and also adds socket.id to message all according to classes blueprint Messages
    classesMessagesArray.push(newMessageClasses);
    //console.log(newMessageClasses);
    
    //socket.broadcast.emit('read-message', newMessageClasses); //send message to all users except the sender
    io.sockets.emit('read-message', classesMessagesArray); //send message to all users including the sender
  });

  
  //when new user connects, server pushes the info to user list and emits an event
  socket.on('add-user', function(data) {
    let newUsersClasses = new User(data.user, data.userID); //create new user object
    classesUsersArray.push(newUsersClasses);
    //console.log(newUsersClasses);
    //io.sockets.emit('update-users', classesUsersArray); //users array is updated and pushed to all users
    socket.broadcast.emit('update-users', classesUsersArray); //users array is updated and pushed to all users except the sender
  });



  socket.on('load-messages', function(selectedUserID) {
    //filter classesPrivateMessagesArray to only include messages from selectedUserID
    // selectedUserMessages = classesPrivateMessagesArray.filter(function(message) {
    //   return message._userID === selectedUserID;
    // }
    // );
    //empty selectedUserMessages array
    let selectedUserMessages = [];

    for(let i = 0; i < classesPrivateMessagesArray.length; i++) {
      if(classesPrivateMessagesArray[i]._userID === selectedUserID && classesPrivateMessagesArray[i]._to === socket.id) {
        selectedUserMessages.push(classesPrivateMessagesArray[i]);
      }
    }
    console.log(selectedUserMessages);
    
    //send selected messages to client
    socket.emit('selected-messages', selectedUserMessages);
  
    // io.to(socket.id).emit('load-messages', selectedUserMessages);

  });



  //when user disconnects, server updates user list and removes user
  socket.on('disconnect', function() {
    classesUsersArray = classesUsersArray.filter(function(user) {
      return user._userID != socket.id;
    });
    io.emit('update-users', classesUsersArray);
  });

  //private messaging
  //receive private message from client and emit it to receiver
  socket.on('private-message', function (privateData) {
    let newPrivateMessageClasses = new Message(privateData.message, privateData.user, privateData.userID, privateData.to);//takes message content and user from app emit and also adds socket.id to message all according to classes blueprint Messages
    //console.log(newPrivateMessageClasses);
    classesPrivateMessagesArray.push(newPrivateMessageClasses);
    socket.to(privateData.to).emit('private-read-message', {
    privateData,
    from: socket.id,
    },

  // socket.on('private-message', function (privateData) {
  //   let newPrivateMessageClasses = new Message(privateData.message, privateData.user, privateData.userID);//takes message content and user from app emit and also adds socket.id to message all according to classes blueprint Messages
  //   classesMessagesArray.push(newPrivateMessageClasses);
  //   socket.to(privateData.to).emit('private-read-message', {
  //   privateData,
  //   from: socket.id,
  //   },



    //also send message to sender
    socket.emit('private-read-message', { //also emit message to sender so it can be conditionally rendered
      privateData,
      from: socket.id,
    })

  );

});
});


