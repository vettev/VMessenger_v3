<template>
    <v-list-tile avatar>
        <v-list-tile-title>{{ result.name }}</v-list-tile-title>
        <v-list-tile-action>
            <v-btn success @click="addToContacts" :disabled="loading" :loading="loading" v-if="displayButton">
                <span>Add to contacts</span>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>
<script>
    export default {
        props: ['result'],
        data() {
            return {}
        },
        computed: {
            displayButton() {
                return this.$store.getters.hasUserInContacts(this.result.id) == false
                && this.result.id !== this.$store.getters.user.id;
            },
            loading() {
                return this.$store.getters.isLittleLoadingActive;
            }
        },
        methods: {
            addToContacts() {
                this.$store.dispatch('addContact', this.result.id);
            }
        }
    }
</script>
<style>
    
</style>