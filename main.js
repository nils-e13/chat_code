class chat {
    constructor (user, message) {
        this._user = user;
        this._message = message;
    }
    
}

class user {
    constructor (firstName, lastName, profileImage) {
        this._fistName = firstName;
        this._lastName = lastName;
        this._profileImage = profileImage;
    }


}

class message {
    constructor (user, content, time) {
        this._user = user;
        this._content = content;
        this._time = time;
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