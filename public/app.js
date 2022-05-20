let socket = io("localhost:3000");
// let socket = io();

// ViewModel
const app = Vue.createApp({
    data() {
        return {
            //messages: sendMessages, //not sure if needed
            messages: [],
            users: [],
            userName: '',
        }
    },
    methods: {
        sendMessage: function(message) {
            if(message){
                socket.emit('send-message', {message: message, user: this.userName}); //send message content + username to server
                console.log("messagereceivedinapp");
            }
        },

        //receives this.userName as first value from @set-name="setName" component from parent which passes it to setName method here
        setName: function(userName) {
            this.userName = userName;
            console.log("userName: " + userName + " received in app")
            socket.emit('add-user', this.userName);
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
    mountedApp.messages.push({text : message.text, user : message.user, date: message.date});
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
    app.users = users;
    // console.log(users);
});
