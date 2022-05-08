app.component('login-screen', {

    template:
    /*html*/
    `
    <!-- Login-Screen -->
    <div class="login-screen" v-if="hide">
        <form class="login-form" @submit="checkForm">
            <h2 class="login-title">Welcome</h2>
            <input class="login-input-field" type="text" id="username" v-model="input.username" placeholder="Your Name...">

            <button class="login-button">Log In</button>
        </form>
    </div>`,
    data() {
        return {
            hide: true,
            input: {
                username: '',
                //password: ''
            }

        }
    },
    methods:{
        checkForm( event) {
            if (this.input.username != '') {
                this.hide = false;
            }
            else {
                this.checkForm = true;
            }
            event.preventDefault();
        
          }
        },
        // mounted: function () {
        //     this.checkForm = false;
        // }
        

});
