class chat {
    constructor (uid) {
        this._uid = uid;
        //this.messages
        //this.sender
        //this.receiver
    
    }
    
}

class user {
    constructor (name) {
        this._name = name;
        
    }

}

class message {
    constructor (content, timeStamp) {
        this._content = content;
        this._timeStamp = timeStamp;
    }


}

let testMessage = new message("1234", "Lorem Ipsum Test", "12:49");

const sendMessages = [testMessage];


(function() {

    const app = document.querySelector("#app");
    const socket = io();

    let uname;

    app.querySelector(".login-form").addEventListener("submit", function() {
        let username = app.querySelector(".login-form #username").value;
        if(username.length == 0) {
            alert("Please enter a username");
            return;
        }
        socket.emit("newuser", username);
        uname=username;
        app.querySelector(".login-screen-visibility").style.display = "none";
        console.log("none login screen");
        app.querySelector(".main-container-visibility").style.display = "block";
    
    });
})();
