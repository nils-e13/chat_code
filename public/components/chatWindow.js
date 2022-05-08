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



    </div>
    `,
    data() {
        return {
            messages: [],
            content: '',

        }
    },
    methods:{
        onSubmit() {
            let sendMessageBubble = {
                content: this.content,
            }
            this.messages.push(sendMessageBubble);
            
            //emit message to server
            emitMessage(this.content);
            
            //reset input field
            this.content = '';
        },
    
    },
    
});


const socket = io("ws://localhost:3000");

//emit message to server
function emitMessage(content) {
    socket.emit("chatMessage", content);
}

function receiveMessage() {
    socket.on("chatMessage", function(message) {
        console.log("Message from server: " + message);

    }
);}

// socket.on('chat message', function(msg) {
//     var item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
//   });

// function receiveMessage () {
// socket.on("chatMessage", (content) => {
//     let receiveMessageBubble = {
//         content: content,
//     }
//     this.messages.push(receiveMessageBubble);
// }
// );
// }