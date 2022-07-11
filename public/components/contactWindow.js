app.component('contact-window', {
    props: ['usersFromServer', 'userName', 'userID'],
    emits: ['selectContact'],
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
            <div class="online-users-list cursor-pointer" v-for="(usersFromServer, index) in usersFromServer" :key="index" @click="addContact(usersFromServer._user, usersFromServer._userID)">
                <!--store online users and make them clickable to add them to data contact list-->
                <p class="message-content" v-if="userID != usersFromServer._userID"> {{usersFromServer._user}} </p>
                <div class="green-circle" v-if="userID != usersFromServer._userID"></div> <!--green circle for online users-->
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
                    
                    <div :class="{toggleColor: blue}" class="contact-field cursor-pointer" @click="selectGlobalChat(); blue = !blue"> <!--selection field for the messaging contact-->
                        <div class="contact-block"> <!--block for current contact with profile image and name-->
                            <h2> global chat</h2>
                        </div>    
                    </div>
                    

                    <!--contact list-->
                    <div v-for="item in messageContacts"> <!--v-for loop to iterate over messageContacts array and :key="index" is used to prevent duplicate messages from being displayed -->

                        <!--<div class="contact-field cursor-pointer" :style="color" @click="selectContact(item.privateContact, item.privateUserID); toggleBlueColor()">--> <!--store online users and make them clickable for private messaging-->
                        <div :class="{toggleColorPrivate: blue}" class="contact-field cursor-pointer" @click="selectContact(item.privateContact, item.privateUserID); blue = !blue"> <!--store online users and make them clickable for private messaging-->
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
            color: {
                backgroundColor: 'transparent',
                
            },
            blue: false,
        }
    },
    methods:{
        toggleBlueColor: function () {
            //if selectedUserDetails.privateUserID is equal to messageContacts.privateUserID, then change color to blue
            // if (this.selectedUserDetails.privateUserID == this.messageContacts.privateUserID) {
            //     this.color = {
            //         backgroundColor: '#2863E4',
            //     }
            // }
                

            // if (this.color.backgroundColor === 'transparent') {
            // this.color.backgroundColor = '#2863E4';
            // } else {
            // this.color.backgroundColor = 'transparent';
            // }
        },
        //adds online user to messageContacts array and displays in contact list
        addContact: function (userName, userID) {
            
            let addPrivateContact = {
                privateContact: userName,
                privateUserID: userID,
                // contactCount: 0,

            }
           //only add user if not already in messageContacts array
            if (this.messageContacts.length === 0) {
                this.messageContacts.push(addPrivateContact);
            } else {
                for (let i = 0; i < this.messageContacts.length; i++) {
                    if (this.messageContacts[i].privateUserID === userID) {
                        break;
                    } else if (i === this.messageContacts.length - 1) {
                        this.messageContacts.push(addPrivateContact);
                    }
                }
            }

            //increase contact count for each contact added
            // for (let i = 0; i < this.messageContacts.length; i++) {
            //     this.messageContacts[i].contactCount++;
            // }

            console.log(this.messageContacts);
            console.log("contact added: " + "userName:" + userName + "userID: "+ userID);
            
            if (userName) {
                this.hide = false;
            }
        },
        //selecting contact stores contact details in selectedUserDetails array
        selectContact: function (userName, userID) {
            let addSelectedUserDetails = {
                privateContact: userName,
                privateUserID: userID,
            }
            this.selectedUserDetails.splice(0); //clear array
            this.selectedUserDetails.push(addSelectedUserDetails); //store only selected details of contact into selectedUserDetails array
            // console.log("addSelectedUserDetails");
            // console.log(this.selectedUserDetails);
            this.$emit('selectContact', this.selectedUserDetails);
            // this.$emit('selected-contact', this.selectedUserDetails); //emit event to app.js to display selected contact details
        },
        selectGlobalChat: function () {
            let addSelectedUserDetails = {
                privateContact: "global chat",
                privateUserID: "gc123",
            }
            this.selectedUserDetails.splice(0); //clear array
            this.selectedUserDetails.push(addSelectedUserDetails); //store only selected details of contact into selectedUserDetails array
            this.$emit('selectContact', this.selectedUserDetails);

        },
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

            
        
    },
});
