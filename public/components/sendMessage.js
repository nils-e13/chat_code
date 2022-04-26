//component for sent chat messages
app.component('send-message', {
    props: {
        content: {
            type: String,
            required: true
        }
    },

    template:
    /*html*/
    `<div class="send-message-block">
    <p class="message-content" v-for="(content, index) in content" :key="index"> {{ content.content }} </p>
    </div>`,
    
    
})

