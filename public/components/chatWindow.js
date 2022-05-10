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
            <ul>
                    <!--iterateing over messages-->
                    <li v-for="message in messages">
                        <!--bind each message data to message component-->
                        <message v-bind:message-data="message"></message>
                    </li>
                </ul>
        
                <!--Component sendMessage.js for all sent out chat messages-->
                <!--<send-message v-if="messages.length" :messages="messages"></send-message>--> <!--//adding messages props that live on messages array component-->

                <!--paragraph for send out chat messages-->
                <p class="message-content send-message-block no-margin" v-for="(content, index) in messages" :key="index"> {{ content.content }} </p>

                <!--paragraph for received chat messages-->
                <p class="message-content receive-message-block no margin" v-for="(content, index) in messages" :key="index"> {{  }} </p> //content.content

            </div>
        </div>

        <!-- Block for text input form -->
        <form class="text-input-form" id="text-input-form" @submit.prevent="onSubmit">
            <div class="text-input-field"> <!--input field for chat messages-->
                <!--when message is sent, input emits an event (send-message)-->
                <input id="input" v-model="content" //v-on:send-message="sendMessage" class="message-input-field" type="text" placeholder="Message...">
                <button class ="btn" type="submit" value="Submit"><i class="ph-paper-plane-right-fill"></i></button>
            </div>
        </form>

            <!--user list-->  
            <div>
                <users v-bind: users="users"></users>
            </div>

    </div>
    `,
    data() {
        return {
            messages: [],
            users: [],
            userName: '',

            content: '',

        }
    },
    methods:{
        sendMessage: function(message) {
            if(message){
                socket.emit('send-msg', {message: message, user: this.userName});
            }
        },

        // onSubmit() {
        //     let sendMessageBubble = {
        //         content: this.content,
        //     }
        //     this.messages.push(sendMessageBubble);
            
        //     //emit message to server
        //     emitMessage(this.content);
            
        //     //reset input field
        //     this.content = '';
        // },
    
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