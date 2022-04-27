//component for sent chat messages
app.component('send-message', {
    props: {
        messages: { //takes in messages from chat-window events payload
            type: Array,
            required: true
        }
    },

    template:
    /*html*/
    `<!--<div class="send-message-block">-->
    <!--v-for -> print out each content from our messages array in the chat window, in ... messages has to be defined as props above-->
    <p class="message-content send-message-block no-margin" v-for="(content, index) in messages" :key="index"> {{ content.content }} </p>
    <!--</div>-->`,
    
    
})

