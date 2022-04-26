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

            <send-message :content="sendMessage"></send-message>
           
        </div>
    </div>

    <!-- Block for text input field -->
    <message-input @send-message="sendMessage"></message-input>

    </div>`,
    data() {
        return {
            messages: '',

        }
    },
    methods:{
        sendMessage(content) {
            this.content.push(content);
        }
    }
})