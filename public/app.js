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
                socket.emit('private-message', {
                    _text: message, _user: this.userName, _userID: socket.id,
                    _to: 'gc123',
                  });
            }
        },

        //receives this.userName as first value @set-name="setName" from loginScreencomponent from parent which passes it to setName method here
        setName: function(userName) {
            this.userName = userName;
            this.userID = socket.id;
            socket.emit('add-user', {user: this.userName, userID: socket.id}); //send username to server
        },

        //receives selectedContact from chatWindowcomponent from parent which passes it to setSelectedContact method here
        selectedContactFunction: function(selectedUserDetails){ //receives selectedUserDetails from chatWindowcomponent
            this.selectedContact = selectedUserDetails;

            this.messages.splice(0, this.messages.length); //clear messages array
            this.privateMessages.splice(0, this.privateMessages.length); //clear privateMessages array
            //initialize privateMessages array with messages from selected user

            //send selected userID to server + userID to server
            socket.emit('load-messages', {selectedUserID: selectedUserDetails[0].privateUserID, userID: socket.id});
        },

        //receives privateMessage from App and sends to selected contact userID to Server
        sendMessageToSelectedContactFunction: function(privateMessage) { //receives messageContent from input field
            if(privateMessage){
                socket.emit('private-message', {
                    _text: privateMessage, _user: this.userName, _userID: socket.id,
                    _to: this.selectedContact[0].privateUserID,
                  });
            }
        },
    },
});

//Client socket events
//When server emits message, client updates message list in app
socket.on('read-message', function(message) {
    mountedApp.messages = message; //update message list in app
});

//When server emits private message, client updates private message list in app
socket.on('private-read-message', function (privateData) {
    //push privateData to messages array
    mountedApp.privateMessages.push(privateData);
    //mountedApp.messages.push(privateData); //push privateData to messages array that includes all messages from all users
});

socket.on('global-read-message', function (globalData) {
    mountedApp.messages.push(globalData);
    
});

socket.on('private-read-message-sender', function (privateData) {
    //push privateData to messages array
    mountedApp.privateMessages.push(privateData);
   // mountedApp.messages.push(privateData);
});

 //receive filtered messages from selected UserID from server
 socket.on('selected-messages', function(selectedUserMessages){
    mountedApp.privateMessages = selectedUserMessages;
});

socket.on('global-messages', function(globalChatMessages){
    mountedApp.messages = globalChatMessages;
});

//when new user connects, server emits user-connected event which updates user list
socket.on('user-connected', function(userID) {
    app.users.push(userID);
});

//initialize chat window, updates initial chat with current messages
socket.on('init-chat', function(messages) {
    //update messages array with messages from server
    mountedApp.messages = messages;
});


socket.on('init-private-chat', function(privateMessages) {
    //update messages array with messages from server
    mountedApp.privateMessages = privateMessages;
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

