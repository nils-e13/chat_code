let socket = io("localhost:3000");
// let socket = io();

// ViewModel
const app = Vue.createApp({
    data() {
        return {
            //messages: sendMessages, //not sure if needed
            messages: [], //received messages from server for all clients except sender
            users: [],
            userName: '',
            userID: '',
            
        }
    },
    methods: {
        sendMessage: function(message) { //receives messageContent from input field and emits it + userName to server
            if(message){
                socket.emit('send-message', {message: message, user: this.userName, userID: socket.id}); //send message content + username to server
                console.log("messageContent received in App and sent to server");
            }
        },

        //receives this.userName as first value @set-name="setName" from loginScreencomponent from parent which passes it to setName method here
        setName: function(userName) {
            this.userName = userName;
            this.userID = socket.id;
            socket.emit('add-user', {user: this.userName, userID: socket.id}); //send username to server
            console.log("usernames emitted from app to server");
        },

        // This method is used to scroll the chatbox when a new message is printed
        // scrollToEnd: function() {       
        //     var container = this.$el.querySelector("#messages");
        //     container.scrollTop = container.scrollHeight;
        // },
    },

    updated(){
        //this.scrollToEnd();
    }
    // mounted() {

    // }
 
});

//Client socket events
//When server emits message, client updates message list in app
socket.on('read-message', function(message) {
    // mountedApp.messages.push({text : message.text, user : message.user, date: message.date}); //once client receives message from server, push to message list array
    mountedApp.messages.push({text : message._text, user : message._user, userID : message._userID/*date: message.date*/}); //once client receives message from server, push to message list array
    console.log("message from server received in app");
    console.log(message);
});





//when new user connects, server emits user-connected event which updates user list
socket.on('user-connected', function(userID) {
    app.users.push(userID);
    // console.log(userID);
});

//initialize chat window, updates initial chat with current messages
socket.on('init-chat', function(messages) {
    app.messages = messages;
    // console.log(messages);
});

//initialize user list, updates user list when the client initially connects
socket.on('update-users', function(users) {
    mountedApp.users.push({user : users._user, userID : users._userID}); //once client receives usersfrom server, push to users array
    // console.log(users);
});
