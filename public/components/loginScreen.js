//component to log contacts
app.component('login-screen', {

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
            if (this.userName.length > 0 ) {
                this.hide = false;
                this.$emit('set-name', this.userName); //input.userName is passed as payload to set-name event
                console.log("userName: " + this.userName + " just joined");
            }
        
        },
        
        //   setName (userName) {
        //     this.userName = userName;
        //     socket.emit('add-user', this.userName);
        // },

        },
        

});
