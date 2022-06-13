let socket = io("localhost:3000");
// let socket = io();

// ViewModel
const app = Vue.createApp({
    data() {
        return {
            //messages: sendMessages, //not sure if needed
            messages: [], //received messages from server for all clients except sender
            privateMessages: [], //received messages from server for selected client
            users: [],
            userName: '',
            userID: '',
            selectedContact: [],
            
        }
    },
    methods: {
        sendMessage: function(message) { //receives messageContent from input field and emits it + userName to server
            if(message){
                socket.emit('send-message', {message: message, user: this.userName, userID: socket.id}); //send message content + username to server
                //console.log("messageContent received in App and sent to server");
            }
        },

        //receives this.userName as first value @set-name="setName" from loginScreencomponent from parent which passes it to setName method here
        setName: function(userName) {
            this.userName = userName;
            this.userID = socket.id;
            socket.emit('add-user', {user: this.userName, userID: socket.id}); //send username to server
        },

        selectedContactFunction: function(selectedUserDetails){
            //console.log("selectedUserDetails received in app");
            // console.log(selectedUserDetails);
            //receive from contactWindow
            this.selectedContact = selectedUserDetails;

            //console.log("App selectedUserDetails: "+ this.selectedContact);
        },

        //receives privateMessage from App and sends to selected contact userID to Server
        sendMessageToSelectedContactFunction: function(privateMessage) { //receives messageContent from input field
            if(privateMessage){
                socket.emit('private-message', {
                    message: privateMessage, user: this.userName, userID: socket.id,
                    to: this.selectedContact[0].privateUserID,
                  });
                //   console.log("private message sent to server");
                //   this.selectedContact.messages.push({
                //     message,
                //     fromSelf: true,
                //   });
                //console.log("private message received in App and sent to server");
            }
        },
    },
});

//Client socket events
//When server emits message, client updates message list in app
socket.on('read-message', function(message) {
    mountedApp.messages = message; //update message list in app
});

//doesnt work yet to receive private message from server
socket.on('private-read-message', function ({ privateData, from }) {
    console.log("private message from server received in app");
    console.log(privateData);
    console.log(from);
    //push privateData to messages array
    mountedApp.privateMessages.push(privateData);
});


//when new user connects, server emits user-connected event which updates user list
socket.on('user-connected', function(userID) {
    app.users.push(userID);
    // console.log(userID);
});

//initialize chat window, updates initial chat with current messages
socket.on('init-chat', function(messages) {
    //update messages array with messages from server
    mountedApp.messages = messages;
    // console.log("initial chat from server received in app");
    // console.log(messages);
});

//initialize user list, updates initial user list with current users
socket.on('init-users', function(users) {
    //update messages array with messages from server
    mountedApp.users = users;
});

//initialize user list, updates user list when the client initially connects
socket.on('update-users', function(users) {
    //mountedApp.users.push({user : users._user, userID : users._userID}); //once client receives usersfrom server, push to users array
    mountedApp.users = users;
});



//private messaging
//receive private message from server
// socket.on("private message", ({ message, from }) => {
//   for (let i = 0; i < this.users.length; i++) {
//     const user = this.users[i];
//     if (user.userID === from) {
//       user.messages.push({
//         message,
//         fromSelf: false,
//       });
//       if (user !== this.selectedUser) {
//         user.hasNewMessages = true;
//       }
//       break;
//     }
//   }
// });

