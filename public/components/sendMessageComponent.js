//component for sent chat messages
app.component('send-message-component', {
    props: ['messageData', 'messageContentFromSender'],

    template:
    /*html*/
    `
    <div class="send-message-block">
        <!--v-for -> print out each content from our messages array in the chat window, in ... messages has to be defined as props above-->
        <p class="message-content send-message-block no-margin" v-for="(messageContent, index) in messageContentFromSender" :key="index">
            <!--{{ messageData.text }} --> {{ messageContent.messageContent }}
            <br>
            <!--<strong>{{messageData.user}}</strong> <small>{{messageData.date}}</small>-->
        </p>
    </div>
    `,
     
});

