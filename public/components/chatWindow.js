//component for the entire chat window
app.component('chat-window', {
    props: ['messageData', 'userName', 'users'],
    template:
    /*html*/
    `
    <!-- Chat Container  -->
    <div class="chat-wrapper"> <!--right wrapper to display chat messages-->
        <div class="contact-wrapper-top-chat"> <!--top wrapper to display current contact name-->
            <div class="contact-block"> <!--block for current contact with profile image and name-->
                <!-- <div class="profile-image-circle"></div> circle for profile image -->
                <h2> global chat<!--{{messageData.user}}--> </h2>
            </div>

        </div>
        <div class="name-chat-divider"> <!--divider between contact name and chat messages-->

        </div>

        <!-- Block for chat messages -->
        <div id=#messages class="message-block-scroll">
            <div class="message-window-container"> <!--container for chat messages-->
            
            <!--<p>{{ message }}</p> -->
                <ul>
                    <!--iterateing over messages-->
                    <!--<li v-for="message in messages">-->
                    <li>
                        <!--bind each message data to message component-->
                        <send-message-component :message-data="message"></send-message-component>
                    </li>
                </ul>

            </div>
        </div>

        <!-- Block for text input form -->
        <form class="text-input-form" id="text-input-form" @submit.prevent="sendToApp">
            <div class="text-input-field"> <!--input field for chat messages-->
                <!--when message is sent, input emits an event (send-message)-->
                <input id="input" v-model="messageContent" class="message-input-field" type="text" placeholder="Message...">
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
            messageContent: '',

            //content: '',

        }
    },
    methods:{
        sendToApp () {
            if(this.messageContent.length > 0) {
                this.$emit('send-message', this.messageContent);
                this.messageContent = '';
        }
    
    },
    
    },
});