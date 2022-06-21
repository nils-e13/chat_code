let socket = io("localhost:3000");
// let socket = io();

// ViewModel
const app = Vue.createApp({
    data() {
        return {
            //messages: sendMessages, //not sure if needed
            messages: [], //received messages from server for all clients except sender
            privateMessages: [], //received messages from server for selected client
            storageMessages: [],
            users: [],
            userName: '',
            userID: '',
            selectedContact: [],
            test: [],
            
            
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

        selectedContactFunction: function(selectedUserDetails){ //receives selectedUserDetails from chatWindowcomponent
            this.selectedContact = selectedUserDetails;
            //this.messages.splice(0, this.messages.length); //clear messages array
            this.privateMessages.splice(0, this.privateMessages.length); //clear privateMessages array
            //initialize privateMessages array with messages from selected user

            //send selected userID to server + userID to server
            socket.emit('load-messages', selectedUserDetails[0].privateUserID);

            //receive filtered messages from selected UserID from server
            socket.on('selected-messages', function(selectedUserMessages){
            console.log(selectedUserMessages);
            mountedApp.privateMessages = selectedUserMessages;

            }
            );

            // for(let i = 0; i < this.messages.length; i++){ //loop through messages array
            //     console.log("app messages")
            //     console.log(this.messages[i]); // not working yet
            //     //muss noch angepasst werden
            //     if(this.messages[i]._userID == (this.selectedContact._userID && this.messages[i]._to)){ //if message belongs to selected user
            //         this.privateMessages.push(this.messages[i]); //push message to privateMessages array
            // }
        
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
    // console.log("private message from server received in app");
    // console.log(privateData);
    // console.log(from);
    //push privateData to messages array
    mountedApp.privateMessages.push(privateData);
    mountedApp.messages.push(privateData); //push privateData to messages array that includes all messages from all users
    mountedApp.storageMessages.push(privateData);
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

