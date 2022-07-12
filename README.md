# chat_code
 Chat.app Programmiersprachen2 IoT2 HfG.
Development of a chat app using Vue3, JavaScript, HTML and CSS.
This was part of the course Programming lanugages 2 in the second semester at the university of applied sciences Schwäbisch Gmünd with Robin Palleis.

## To start the chat app:
1. Start Server in terminal with: node server.js
2. View in Browser with localhost:3000

### Important Information:
If there is already a conversation in global chat and a new user connects, previous messages arent initializied first so you first need to click the global chat message contact on the left.
If a user is already logged in, you wont have to select global chat and messages are beeing initialized properly. This is something that i want to change in the future so all global chat messages are automatically initialized once a completely new user connects after a conversation is already started. So you wont need to select global chat on the left.

Otherwise controls and ui should be intuitive.
For the best experience, start by adding a couple users in first and then begin messaging.

### Whats next:
- initialize global chat messages history on page load for completely new users
- turn selected contact card on the left blue once selected
- rewrite naming conventions to enable other programmers a better understanding

