app.component('login-screen', {

    template:
    /*html*/
    `
    <!-- Login-Screen -->
    <div class="login-screen" v-if="hide">
        <form class="login-form" @submit="checkForm">
            <h2 class="login-title">Welcome</h2>

            <!--emits username as username when user logs in-->
            <input class="login-input-field" type="text" id="username" v-model="input.userName" placeholder="Your Name...">

            <button class="login-button" >Log In</button>
        </form>
    </div>

    `,
    data() {
        return {
            hide: true,
            input: {
                userName: '',
                //password: ''
            }

        }
    },
    methods:{
        //checks if userName is entered and if so, hides login screen and shows chat screen
        checkForm( event ) {
            if (this.input.userName != '') {
                this.hide = false;
                this.$emit('set-name', this.input.userName); //input.userName is passed as payload to set-name event
            }
            else {
                this.checkForm = true;

            }
            event.preventDefault();
        
        },
        
          setName: function(userName) {
            this.userName = userName;
            socket.emit('add-user', this.userName);
        },

        },
        

});
