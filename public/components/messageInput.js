//component for the message input field at the bottom of the chat window
app.component('message-input', {
    template:
    /*html*/
    `<!-- input for text message -->
    <form class="text-input-form" @submit.prevent="onSubmit">
    <div class="text-input-field"> <!--input field for chat messages-->
    <input id="content" v-model="content" class="message-input-field" type="text" placeholder="Message...">
    <button class ="btn" type="submit" value="Submit"><i class="ph-paper-plane-right-fill"></i></button>
    </div>
    </form>`,
    data() {
        return {
            content: '',
            //uid: '',
            //timeStamp: '',

        }
    },
    methods: {
        onSubmit() {
            let sendMessageBubble = {
                content: this.content,
            }
            this.$emit('message-submitted', sendMessageBubble); //message-submitted event passing along sendMessageBubble as payload

            //reset input field
            this.content = '';
        }
    }

})