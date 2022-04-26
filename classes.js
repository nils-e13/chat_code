class chat {
    constructor (uid) {
        this._uid = uid;
    
    }
    
}

class user extends chat{
    constructor (uid, firstName, lastName, profileImage) {
        super(uid);
        this._fistName = firstName;
        this._lastName = lastName;
        this._profileImage = profileImage;
    }
    fullName(){
        return this._fistName + " " + this._lastName;
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
