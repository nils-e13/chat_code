//expressjs
const express = require('express');
const path = require("path");

// setup express application
const app = express();
const server = require("http").createServer(app);
let port = 3000;

//create new socket.io instance attached to the http server
const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+'/public')));


//classes for oop
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
  });

  
  //when new user connects, server pushes the info to user list and emits an event
  socket.on('add-user', function(data) {
    let newUsersClasses = new User(data.user, data.userID); //create new user object
    classesUsersArray.push(newUsersClasses);
    //console.log(newUsersClasses);
    //io.sockets.emit('update-users', classesUsersArray); //users array is updated and pushed to all users
    socket.broadcast.emit('update-users', classesUsersArray); //users array is updated and pushed to all users except the sender
  });


  //when a user sends a message, server pushes the info to message list and emits an event
  socket.on('load-messages', function(selectedConvoUserID) {
    //filter classesPrivateMessagesArray to only include messages from selectedUserID
    let selectedUserMessages = [];
    let globalChatMessages = [];
   
    //for loop to filter selected and global messages
    for(let i = 0; i < classesPrivateMessagesArray.length; i++) {
      //if statement for global messages
      if(classesPrivateMessagesArray[i]._to === selectedConvoUserID.selectedUserID) {
        globalChatMessages.push(classesPrivateMessagesArray[i]);
      }
      //if statement for received messages
      else if(classesPrivateMessagesArray[i]._userID === selectedConvoUserID.selectedUserID && classesPrivateMessagesArray[i]._to === selectedConvoUserID.userID) {
        //console.log(classesPrivateMessagesArray[i]);
        selectedUserMessages.push(classesPrivateMessagesArray[i]);
      }
      //if statement for private send messages
      else if(classesPrivateMessagesArray[i]._userID === selectedConvoUserID.userID && classesPrivateMessagesArray[i]._to === selectedConvoUserID.selectedUserID) {
        //console.log(classesPrivateMessagesArray[i]);
        selectedUserMessages.push(classesPrivateMessagesArray[i]);
      }
    }
    //send selected messages to client
    socket.emit('selected-messages', selectedUserMessages);
    socket.emit('global-messages', globalChatMessages);
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
    let newPrivateMessageClasses = new Message(privateData._text, privateData._user, privateData._userID, privateData._to);//takes message content and user from app emit and also adds socket.id to message all according to classes blueprint Messages
    classesPrivateMessagesArray.push(newPrivateMessageClasses);

    //send message to all users including the sender
  if(privateData._to === 'gc123') {
    io.emit('global-read-message', {
      _text: newPrivateMessageClasses._text,
      _user: newPrivateMessageClasses._user,
      _userID: newPrivateMessageClasses._userID,
      _to: "gc123"
    }); 
  } else {
    //send message to receiver
    socket.to(privateData._to).emit('private-read-message', {
      _text: newPrivateMessageClasses._text,
      _user: newPrivateMessageClasses._user,
      _userID: newPrivateMessageClasses._userID,
      _to: newPrivateMessageClasses._to
    },
    //also send message to sender
    socket.emit('private-read-message-sender', { //also emit message to sender so it can be conditionally rendered
      //send message to sender
      _text: newPrivateMessageClasses._text,
      _user: newPrivateMessageClasses._user,
      _userID: newPrivateMessageClasses._userID,
      _to: newPrivateMessageClasses._to
    })
    );
  }
});
});



