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
                        <!--components for send out and received messages-->

                        <!-- <received-message-component></received-message-component> -->
                        <send-message-component :message-content-from-sender="messageContentFromSender" :message-data="message"></send-message-component>
                        <!--<p class="message-content send-message-block no-margin" v-for="(messageContent, index) in messageContentFromSender" :key="index"> {{messageContent.messageContent}} </p>-->
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
            messageContent: '', //stores message content from input field until submit button is clicked
            messageContentFromSender: [], //stores message content from input field after submit button is clicked

            //content: '',

        }
    },
    methods:{
        sendToApp () {

            
            if(this.messageContent.length > 0) {
            //test to store message content from input field and display it as chat bubble
            let sendMessageBubble = {
                messageContent: this.messageContent,
            }
            this.messageContentFromSender.push(sendMessageBubble);
            //end of test

                this.$emit('send-message', this.messageContent);
                this.messageContent = ''; //reset input field
            }

    },
    
    },
});