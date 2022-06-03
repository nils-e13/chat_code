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
                <div @click="addContact(usersFromServer._user, usersFromServer._userID)">
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

                        <!--<div class="contact-field">--> <!--selection field for the messaging contact-->
                        <div class="contact-field cursor-pointer" @click="selectContact(item.privateContact, item.privateUserID)"> <!--store online users and make them clickable for private messaging-->
                            <div class="contact-block"> <!--block for current contact-->

                                <h2>{{item.privateContact}}</h2> <!--displays contact name from messageContactsArray-->
                                <!--<span>{{item.privateUserID}}</span>--> <!--displays contact id from messageContactsArray-->
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
            selectedUserDetails: [], //array to store the selected contact + details
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
        //adds online user to messageContacts array and displays in contact list
        addContact: function (userName, userID) {
            
            let addPrivateContact = {
                privateContact: userName,
                privateUserID: userID,

            }
             
            this.messageContacts.push(addPrivateContact);
            console.log(this.messageContacts);
            console.log("contact added: " + "userName:" + userName + "userID: "+ userID);
            
            if (userName) {
                this.hide = false;
            }
        },
        //selecting contact stores contact details in selectedUserDetails array
        //not sure if its better to push it into app.js and store details of selected contact also there, probably better
        selectContact: function (userName, userID) {
            let addSelectedUserDetails = {
                privateContact: userName,
                privateUserID: userID,
            }
            this.selectedUserDetails.splice(0); //clear array
            this.selectedUserDetails.push(addSelectedUserDetails); //store only selected details of contact into selectedUserDetails array
            // console.log("addSelectedUserDetails");
            // console.log(this.selectedUserDetails);
            //doesnt work yet
            this.$emit('select-contact', this.selectedUserDetails);
            // this.$emit('selected-contact', this.selectedUserDetails); //emit event to app.js to display selected contact details
        }

            
        
    },
});
