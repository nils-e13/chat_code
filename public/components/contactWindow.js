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
            <select v-model="privateContact">
            <div class="online-users-list" v-for="(usersFromServer, index) in usersFromServer" :key="index">
            <option value="{{usersFromServer._userID}}">{{usersFromServer._user}}</option>    
            <!--<p class="message-content cursor-pointer" v-if="userID != usersFromServer._userID" @click="addContactFromList"> {{usersFromServer._user}} </p>-->
            </div>
            </select>

        </div>
        
        
        <div class="contact-wrapper-menu">

                <div class="your-profile-block"> <!--v-for="user in users"-->
                    <h2 id="blue-text"> {{ userName }} </h2>
                    <!--<p> {{ userID }} </p>-->
                </div>

                <div class="add-contact-block cursor-pointer" @click="showContactList">
                    <p class="subheader-2">Add Contact</p>
                    <i class="ph-plus-bold"></i>
                </div>
            </div>


            <div class="contact-block-scroll">
                <div class="contacts-window-container" v-for="privateContact in messageContacts"> <!--contains the contact selection-->
                    <div class="contact-field"> <!--selection field for the messaging contact-->
                        <div class="contact-block"> <!--block for current contact with profile image and name-->
                            <h2> global chat</h2>
                        </div>
                            
                    </div>

                    <div class="contact-field"> <!--selection field for the messaging contact-->
                        <div class="contact-block"> <!--block for current contact with profile image and name-->

                            <h2> {{ privateContact }} </h2>
                            <!--<h2>{{privateContact.userName}}</h2>-->
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
            privateContact: '',
            messageContacts: [],
            //input: {
               
            //}

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
        addContactFromList: function (contacts) {

            let addPrivateContact = {
                privateContact: this.messageContent,
            }
            this.messageContacts.push(addPrivateContact);
            console.log("contact added: " + this.privateContact);

            if (contacts) {
                this.hide = false;
            }
        },
        
    },
});
