class chat {
    constructor (user, message) {
        this._user = user;
        this._message = message;
    }
    
}

class user extends chat{
    constructor (user, message, firstName, lastName, profileImage, userID) {
        super(user, message);
        this._fistName = firstName;
        this._lastName = lastName;
        this._profileImage = profileImage;
        this._userID = userID;
    }
    fullName(){
        return this._fistName + " " + this._lastName;
    }
    get userID(){
        return this._userID;
    }


}

class message extends chat{
    constructor (user, message, content, timeStamp) {
        super(user, message);
        this._content = content;
        this._timeStamp = timeStamp;
    }


}




// ViewModel
const app = Vue.create({
    data() {
        return {

        }
    },
    methods: {}
})