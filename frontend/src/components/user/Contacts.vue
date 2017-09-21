<template>
    <div class="contacts">
        <v-card>
            <v-toolbar class="primary">
                <v-icon>people</v-icon>
                <v-toolbar-title>Contacts</v-toolbar-title>
            </v-toolbar>
            <v-list two-line v-if="contacts.length > 0">
                <app-contact v-for="contact in contacts" :contact="contact" :key="contact.id"></app-contact>
            </v-list>
            <p v-else class="pa-4">You have no contacts yet</p>
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
    }
</script>
<style>

</style>