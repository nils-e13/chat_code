//component for adding new contact
app.component('add-contact', {
    props: [],
    template:
    /*html*/
    `
    <!-- Login-Screen -->
    <div class="add-contact-screen" v-if="hide">
    <div class="add-contact-center">
        <form class="add-contact-form" @submit.prevent="checkForm">
            <h2 class="login-title">Add contact</h2>

            <!--emits username as username when user logs in-->   <!--not sure if input.userName or only user.Name-->
            <input class="login-input-field" type="text" id="username" v-model="userName" placeholder="Contact Name...">

            <button class="login-button" >Add</button>
        </form>
    </div>
    </div>

    `,
    data() {
        return {
            hide: false,
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