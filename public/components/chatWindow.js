//component for the entire chat window
app.component('chat-window', {
    props: ['messages', 'userName', 'users'],
    template:
    /*html*/
    `
    <!-- Chat Container  -->
    <div class="chat-wrapper"> <!--right wrapper to display chat messages-->
        <div class="contact-wrapper-top-chat"> <!--top wrapper to display current contact name-->
            <div class="contact-block"> <!--block for current contact with profile image and name-->
                <!-- <div class="profile-image-circle"></div> circle for profile image -->
                <h2> test name<!--{{messageData.user}}--> </h2>
            </div>

        </div>
        <div class="name-chat-divider"> <!--divider between contact name and chat messages-->

        </div>
        
        <!-- Block for chat messages -->
        <div id=#messages class="message-block-scroll">
            <div class="message-window-container"> <!--container for chat messages-->
            <p>{{ message }}</p> 
                <ul>
                    <!--iterateing over messages-->
                    <li v-for="message in messages">
                        <!--bind each message data to message component-->
                        <message :message-data="message"></message>
                    </li>
                </ul>
        
                <!--Component sendMessage.js for all sent out chat messages-->
                <!--<send-message v-if="messages.length" :messages="messages"></send-message>--> <!--//adding messages props that live on messages array component-->

                <!--paragraph for send out chat messages-->
                <!--<p class="message-content send-message-block no-margin" v-for="(content, index) in messages" :key="index"> {{ content.content }} </p>-->

                <!--paragraph for received chat messages-->
                <!--<p class="message-content receive-message-block no margin" v-for="(content, index) in messages" :key="index"> {{  }} </p> //content.content-->

            </div>
        </div>

        <!-- Block for text input form -->
        <form class="text-input-form" id="text-input-form" @submit.prevent="send">
            <div class="text-input-field"> <!--input field for chat messages-->
                <!--when message is sent, input emits an event (send-message)-->
                <input id="input" v-model="message" class="message-input-field" type="text" placeholder="Message...">
                <button class ="btn" type="submit" value="Submit"><i class="ph-paper-plane-right-fill"></i></button>
            </div>
        </form>

            <!--user list, not really needed-->  
            <!--<div>
                <users v-bind: users="users"></users>
            </div>-->

    </div>
    `,
    data() {
        return {
            message: '',


            //content: '',

        }
    },
    methods:{
        send () {
            if(this.message.length > 0) {
                this.$emit('send-message', this.message);
                this.message = '';
        }
    
    },
    
    },
});