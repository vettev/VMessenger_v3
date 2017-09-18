<template>
    <div class="contacts">
        <v-card>
            <v-toolbar class="primary">
                <v-icon>people</v-icon>
                <v-toolbar-title>Contacts</v-toolbar-title>
            </v-toolbar>
            <v-list two-line>
                <app-contact v-for="contact in contacts" :contact="contact" :key="contact.id"></app-contact>
            </v-list>
        </v-card>
    </div>
</template>
<script>
    import Contact from './Contact.vue';

    export default {
        data() {
            return {
            }
        },
        components: {
            'app-contact': Contact
        },
        computed: {
            contacts() {
                return this.$store.getters.contacts;
            }
        },
        methods: {
            openConversation() {
                console.log('opening conversation');
            }
        }
    }
</script>
<style>

</style>