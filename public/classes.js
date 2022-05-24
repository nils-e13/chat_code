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
    constructor (text, user) {
        this._text = text;
        this._user = user;
        //this._date = date;
    }


}

let testMessage = new message("hello from classes", "Nils");

//let serverMessagesArray = [];
let messageArrayClasses = [testMessage];
//console.log(messageArrayClasses);
