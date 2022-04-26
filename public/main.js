// ViewModel
const app = Vue.createApp({
    data() {
        return {
            messages: sendMessages,
        }
    },
    methods: {
        
    }
})

// app.component('send-message', {
//     template:
//     /*html*/
//     `<div class="send-message-block">
//     <p class="message-content"> {{ content }} </p>
//     </div>`,
//     data() {
//         return {
//             name: "Nils",

//         }
//     },
//     methods: {
//         sendMessage () {
//             this.$emit('sendMessage', this.content);
//         }
//     },
//     props: ['content']
// })

// // Mount app, ab hier alles wieder normal JS
// app.mount('#app')


/*let input = document.getElementById("login-input");

function hidepage(){
    let loginScreen = document.getElementById("login-screen");
    loginScreen.style.display = "none";
    mainContainer.style.display = "block";
};

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      //document.getElementById("login-button").click();
      loginScreen.style.display = "none";
    }
  });
  */