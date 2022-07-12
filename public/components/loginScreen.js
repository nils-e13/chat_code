//component to log contacts
app.component('login-screen', {
    props: ['usersFromServer'],
    template:
    /*html*/
    `
    <!-- Login-Screen -->
    <div class="login-screen" v-if="hide">
        <img src="./images/logo.png" alt="logo" class="logo-image">
        <form class="login-form" @submit.prevent="checkForm">
            <h2 class="login-title">Welcome</h2>

            <!--emits username as username when user logs in-->   <!--not sure if input.userName or only user.Name-->
            <input class="login-input-field" type="text" id="username" v-model="userName" placeholder="Your Name..." autofocus="autofocus">

            <button class="login-button" >Log In</button>
        </form>
    </div>

    `,
    data() {
        return {
            hide: true,
            userName: '',
            //password: ''
            }

        },
    methods:{
        //checks if userName is entered and if so, hides login screen and shows chat screen
        checkForm () {
            //check if username is alread in user, display error messages, else add user to user list
            if (this.userName.length > 0 ) {
                //if username is already in usersFromServer, display error message
                for(var i = 0; i < this.usersFromServer.length; i++){
                    if(this.userName === this.usersFromServer[i]._user){
                        alert("Username already exists");
                        return;
                    }
                }
                //if username is not in usersFromServer, add user to usersFromServer
                this.hide = false;
                this.$emit('set-name', this.userName); //input.userName is passed as payload to set-name event
                console.log("userName: " + this.userName + " just joined");
            }
        
        },
        },
        

});
