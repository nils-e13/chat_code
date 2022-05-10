(function() {
    var socket = io();


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
                socket.emit('send-message', {message: message, user: this.userName});
            }
        },

        setName: function(userName) {
            this.userName = userName;
            socket.emit('add-user', this.userName);
        },

        // This method is used to scroll the chatbox when a new message is printed
        scrollToEnd: function() {       
            var container = this.$el.querySelector("#messages");
            container.scrollTop = container.scrollHeight;
        },
    },

    updated(){
        this.scrollToEnd();
    }
 
});

//Client socket events
//When server emits message, client updates message list
socket.on('read-message', function(message) {
    app.messages.push({text : message.text, user : message.user, date: message.date});
});

//when new user connects, server emits user-connected event which updates user list
socket.on('user-connected', function(userID) {
    app.users.push(userId);
});

//initialize chat window, updates initial chat with current messages
socket.on('init-chat', function(messages) {
    app.messages = messages;
});

//initialize user list, updates user list when the client initially connects
socket.on('update-users', function(users) {
    app.users = users;
});

});
