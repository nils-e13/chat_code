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
