//component for the entire chat window
app.component('chat-window', {

    template:
    /*html*/
    `
    <!-- Chat Container  -->
    <div class="chat-wrapper"> <!--right wrapper to display chat messages-->
    <div class="contact-wrapper-top-chat"> <!--top wrapper to display current contact name-->
        <div class="contact-block"> <!--block for current contact with profile image and name-->
            <!-- <div class="profile-image-circle"></div> circle for profile image -->
            <h2>Full Name</h2>
        </div>

    </div>
    <div class="name-chat-divider"> <!--divider between contact name and chat messages-->

    </div>
    
    <!-- Block for chat messages -->
    <div class="message-block-scroll">
        <div class="message-window-container"> <!--container for chat messages-->
            <!-- <div class="send-message-block">
                <p class="message-content">Dolor do consequat id</p>
            </div> -->
            
            <div class="receive-message-block">
                <p class="message-content">Tempor minim aliqua ad officia magna non laboris.</p>
            </div>

            <!--Component sendMessage.js for all sent out chat messages-->
            <!--<send-message v-if="messages.length" :messages="messages"></send-message>--> <!--//adding messages props that live on messages array component-->
            
            <!--paragraph for received chat messages-->
            <p class="message-content receive-message-block no margin" v-for="(content, index) in messages" :key="index"> {{ content.content }} </p>

            <!--paragraph for send out chat messages-->
            <p class="message-content send-message-block no-margin" v-for="(content, index) in messages" :key="index"> {{ content.content }} </p>

        </div>
    </div>

    <!-- Block for text input form component messageInput.js-->
    <!--<message-input @message-submitted="sendMessage"></message-input>-->


    <!-- Block for text input form -->
    <form class="text-input-form" id="text-input-form" @submit.prevent="onSubmit">
        <div class="text-input-field"> <!--input field for chat messages-->
            <input id="input" v-model="content" class="message-input-field" type="text" placeholder="Message...">
            <button class ="btn" type="submit" value="Submit"><i class="ph-paper-plane-right-fill"></i></button>
        </div>
    </form>



    </div>`,
    data() {
        return {
            messages: [],
            content: '',

        }
    },
    methods:{
        // sendMessage(content) { //takes in content from sendMessageBubble events payload and puts it into messages data
        //     this.messages.push(content);
        // },
        onSubmit() {
            let sendMessageBubble = {
                content: this.content,
            }
            //this.$emit('message-submitted', sendMessageBubble); //message-submitted event passing along sendMessageBubble as payload
            this.messages.push(sendMessageBubble);
            //reset input field
            this.content = '';
        }
    }
});
