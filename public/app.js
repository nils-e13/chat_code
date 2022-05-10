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
            isLogged: false, //for log in window 
        }
    },
    methods: {
        
    },
    //mounted: function () {
        //socket.on(...)
        
    //}
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

})();
