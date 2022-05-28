//component for the entire chat window
app.component('chat-window', {
    props: ['messageFromServer', 'userName'],
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
            
                <!--div for send out chat bubbles-->
                 <!--doesnt work with component yet bec it displays entire array, but as a div without component it works for some reason-->
                <!--<div class="send-message-block" v-for="(messageContent, index) in messageContentFromSender" :key="index">
                        <p class="message-content no-margin"> {{messageContent.messageContent}} </p>
                </div>-->

                <!--div for received chat bubbles-->
                <div v-for="(messageFromServer, index) in messageFromServer" :key="index"> <!-- v-for loop to iterate over messageFromServer array and :key="index" is used to prevent duplicate messages from being displayed -->
                    <p class="message-user-name no-margin"> {{messageFromServer.user}} </p> <!-- displays user name from messageFromServerArray-->    
                    <p class="send-message-block message-content no-margin" v-if="sendMessage"> {{messageFromServer.text}} </p> <!-- displays message text from messageFromServerArray-->
                    <p class="receive-message-block message-content no-margin" v-else="receiveMessage"> {{messageFromServer.text}} </p> <!-- displays message text from messageFromServerArray-->
                </div>

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

                this.$emit('send-message', this.messageContent); //emit messageContent to app.js
                this.messageContent = ''; //reset input field
            }

    },
    
    },
});