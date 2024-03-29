//component for adding new contact
app.component('add-contact', {
    //props: [],
    template:
    /*html*/
    `
    <!-- AddContact-Screen -->
    <div class="background-blur">
    <div class="add-contact-screen no-margin" v-if="hide">
    <div class="add-contact-center no-margin">
        <form class="add-contact-form no-margin" @submit.prevent="checkForm">
            <h2 class="login-title">Add contact</h2>

            <!--emits username as username when user logs in-->   <!--not sure if input.userName or only user.Name-->
            <input class="login-input-field" type="text" id="username" placeholder="Contact Name...">

            <button class="login-button" >Add</button>
        </form>
    </div>
    </div>
    </div>

    `,
    data() {
        return {
            hide: true,
            }

        },
    methods:{
        //checks if userName is entered and if so, hides login screen and shows chat screen
        checkForm () {
            if (this.userName.length > 0 ) {
                this.hide = false;
                //this.$emit('set-name', this.userName); //input.userName is passed as payload to set-name event
                console.log("userName: " + this.userName + " just joined");
            }
        
        },
        },
});