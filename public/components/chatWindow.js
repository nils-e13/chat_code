//component for the entire chat window
app.component('chat-window', {
    props: ['messageFromServer', 'privateMessagesFromServer', 'userName', 'userID', 'selectedContactFromApp'],
    template:
    /*html*/
    `
    <!-- Chat Container  -->
    <div class="chat-wrapper"> <!--right wrapper to display chat messages-->
        <div class="contact-wrapper-top-chat"> <!--top wrapper to display current contact name-->
            <div class="contact-block"> <!--block for current contact with profile image and name-->
                <!-- <div class="profile-image-circle"></div> circle for profile image -->
                <h2 v-if="selectedContactFromApp.length === 0"> global chat </h2>
                <h2  v-else v-for="(selectedContactFromApp, index) in selectedContactFromApp" :key="index"> {{selectedContactFromApp.privateContact}} </h2>
            </div>
        </div>

        <div class="name-chat-divider"> <!--divider between contact name and chat messages-->

        </div>

        <!-- Block for chat messages -->
        <div id=#messages class="message-block-scroll">
            <div class="message-window-container"> <!--container for chat messages-->

                <!--global chat messages-->
                <div class="chat-bubbles" v-for="(messageFromServer, index) in messageFromServer" :key="index"> <!-- v-for loop to iterate over messageFromServer array and :key="index" is used to prevent duplicate messages from being displayed -->
                    <!-- p for global messages-->
                    <p class="message-user-name no-margin" v-if="messageFromServer._userID !== userID"> {{messageFromServer._user}} </p> <!--displays user name from messageFromServer-->
                    <p class="receive-message-block message-content no-margin" v-if="messageFromServer._userID !== userID"> {{messageFromServer._text}} </p> <!--displays receive message from messageFromServer-->
                    <p class="send-message-block message-content no-margin" v-else-if="messageFromServer._userID === userID"> {{messageFromServer._text}} </p> <!--displays send message from messageFromServer-->
                </div>

                <!--private chat messages-->
                <div class="chat-bubbles" v-for="(privateMessagesFromServer, index) in privateMessagesFromServer" :key="index"> <!-- v-for loop to iterate over privateMessagesFromServer array and :key="index" is used to prevent duplicate messages from being displayed -->
                    <template v-for="(selectedContactFromApp, index) in selectedContactFromApp" :key="index"> <!-- v-for loop to iterate over selectedContactFromApp array and :key="index" is used to prevent duplicate messages from being displayed -->
                    <!-- p for private messages -->
                    <p class="receive-message-block message-content no-margin" v-if="selectedContactFromApp.privateUserID == privateMessagesFromServer._userID && selectedContactFromApp.privateUserID !== privateMessagesFromServer._to"> {{privateMessagesFromServer._text}} </p> <!--displays private message text if selectedUID and receivedMessage UID are the same-->
                    <p class="send-message-block message-content no-margin" v-if="userID == privateMessagesFromServer._userID && userID != privateMessagesFromServer._to"> {{privateMessagesFromServer._text}} </p>
                    </template>
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
    </div>
    `,
    data() {
        return {
            messageContent: '', //stores message content from input field until submit button is clicked
            messageContentFromSender: [], //stores message content from input field after submit button is clicked
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
            
            //send message to either all users or selected contact if selected
            if(this.selectedContactFromApp.length > 0) {
                this.$emit('send-message-to-selected-contact', this.messageContent); //emit messageContent for all users to app.js
                this.messageContent = ''; //reset input field
                // console.log('message sent to selected contact');
            } else {
                this.$emit('send-message', this.messageContent); //emit messageContent to selected contact to app.js
                this.messageContent = ''; //reset input field
                // console.log('message sent to all users');
            }
            
            };

        },
    
    },
});