class chat {
    constructor (uid) {
        this._uid = uid;
    
    }
    
}

class user extends chat{
    constructor (uid, name) {
        super(uid);
        this._name = name;
        
    }
    getUID(){
        return this._uid;
    }


}

class message extends chat{
    constructor (uid, content, timeStamp) {
        super(uid);
        this._content = content;
        this._timeStamp = timeStamp;
    }


}

let testMessage = new message("1234", "Lorem Ipsum Test", "12:49");

const sendMessages = [testMessage];
