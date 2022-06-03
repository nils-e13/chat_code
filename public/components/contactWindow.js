app.component('contact-window', {
    props: ['usersFromServer', 'userName', 'userID'],
    template:
    /*html*/
    `
        <!-- Contact Container -->
        <div class="contact-wrapper"> <!--left wrapper to display different messaging contacts-->
            
        <!-- window with list with all online users that can be added-->
        <div class="online-users-block" v-if="hide">
            <div class="add-contact-wrapper-menu">
                
                    <i class="ph-caret-left-bold cursor-pointer" @click="hideContactList"></i>
                    <div class="online-users-title">
                        <h2> Online Users </h2>
                    </div>
                
            </div>

            <!-- all online users that can be added-->
            <div class="online-users-list" v-for="(usersFromServer, index) in usersFromServer" :key="index">
                <!--store online users and make them clickable to add them to data contact list-->
                <div @click="addContact(usersFromServer._userID, usersFromServer._user)">
                    <p class="message-content cursor-pointer" v-if="userID != usersFromServer._userID"> {{usersFromServer._user}} </p>
                </div>

            </div>

        </div>
        
        <!-- window with list of all contacts that can be messaged-->
        <div class="contact-wrapper-menu">

                <div class="your-profile-block"> <!--v-for="user in users"-->
                    <h2 id="blue-text"> {{ userName }} </h2>
                </div>

                <div class="add-contact-block cursor-pointer" @click="showContactList">
                    <p class="subheader-2">Add Contact</p>
                    <i class="ph-plus-bold"></i>
                </div>
            </div>

            <!--block for all message options-->
            <div class="contact-block-scroll">
                
                <div class="contacts-window-container"> <!--contains the contact selection-->
                    <div class="contact-field"> <!--selection field for the messaging contact-->
                        <div class="contact-block"> <!--block for current contact with profile image and name-->
                            <h2> global chat</h2>
                        </div>
                            
                    </div>

                    <!--contact list-->
                    <div v-for="item in messageContacts"> <!--v-for loop to iterate over messageContacts array and :key="index" is used to prevent duplicate messages from being displayed -->

                        <div class="contact-field"> <!--selection field for the messaging contact-->
                            <div class="contact-block"> <!--block for current contact with profile image and name-->

                                <h2>{{item.privateContact}}</h2> <!--displays contact name from messageContactsArray-->
                            </div>
                                
                        </div>
                    </div>

                </div>
            </div>
            <div class="my-profile-block">

            </div>
        </div>

    `,
    data() {
        return {
            hide: false,
            messageContacts: [], //array to store contacts that have been added from online users

        }
    },
    methods:{
        showContactList: function (contacts) {
            if (contacts) {
            this.hide = true;
            }
        },
        hideContactList: function (contacts) {
            if (contacts) {
            this.hide = false;
            }
        },
        addContact: function (userID, userName) {
            let addPrivateContact = {
                privateContact: userName,
                userID: userID,

            }
            this.messageContacts.push(addPrivateContact);
            console.log("contact added: " + "userName:" + userName + "userID: "+ userID);

            if (userName) {
                this.hide = false;
            }
        }
        
    },
});
