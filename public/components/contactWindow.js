app.component('contact-window', {
    props: ['users'],

    template:
    /*html*/
    `
        <!-- Contact Container -->
        <div class="contact-wrapper"> <!--left wrapper to display different messaging contacts-->
            <div class="contact-wrapper-menu">

                <div class="your-profile-block"> <!--v-for="user in users"-->
                    <h2 id="blue-text"> <!--{{ user.name }}--> test</h2>
                </div>

                <div class="add-contact-block">
                    <p class="subheader-2">Add Contact</p>
                    <i class="ph-plus-bold"></i>
                </div>
            </div>

            <div class="contact-block-scroll">
                <div class="contacts-window-container"> <!--contains the contact selection-->
                    <div class="contact-field"> <!--selection field for the messaging contact-->
                        <div class="contact-block"> <!--block for current contact with profile image and name-->
                            <!-- <div class="profile-image-circle"></div> circle for profile image -->
                            <h2>global chat</h2>
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
            //input: {
               
            //}

        }
    },
    methods:{

    },
        

});
