//component for sent chat messages
app.component('message', {
    props: ['messageData'],

    template:
    /*html*/
    `
    <div class="send-message-block">
        <!--v-for -> print out each content from our messages array in the chat window, in ... messages has to be defined as props above-->
        <p class="message-content send-message-block no-margin" :key="index">
            {{ messageData.text }} 
            <br>
            <strong>{{messageData.user}}</strong> <small>{{messageData.date}}</small>
        </p>
    </div>
    `,
     
});

