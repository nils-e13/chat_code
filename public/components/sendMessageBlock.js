app.component('sendMessageBlock', {
    template:
    /*html*/
    `<div class="send-message-block">
    <p class="message-content"> {{ content }} </p>
    </div>`,
    data() {
        return {
            name: "Nils",
            content: "Lorem Ipsum",

        }
    },
    methods: {
        sendMessage () {
            this.$emit('sendMessage', this.content);
        }
    },
    computed: {

    }
})