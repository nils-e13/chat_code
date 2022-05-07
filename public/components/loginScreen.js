app.component('chat-window', {

    template:
    /*html*/
    `
    <!-- Login-Screen -->
    <div class="login-screen">
        <form class="login-form" v-on:submit="login()">
            <h2 class="login-title">Welcome</h2>
            <input class="login-input-field" type="text" id="username" v-model="input.username" placeholder="Your Name...">

            <button class="login-button">Log In</button>
        </form>
    </div>`,
    data() {
        return {
            input: {
                username: '',
                //password: ''
            }

        }
    },
    methods:{
        login(){
            if(this.input.username.length == 0) {
                alert("Please enter a username");
                return;
            }
            else {
                this.$emit("authenticate", true);
                this.$router.replace({ name: 'chat' });

            socket.emit("newuser", this.input.username);
            }
        }
    }
});
