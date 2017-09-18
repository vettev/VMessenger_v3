<template>
    <v-list-tile avatar v-bind:key="contact.id" @click="openConversation()" class="contact">
        <v-list-tile-avatar>
            <img v-bind:src="contact.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title v-html="contact.user.name"></v-list-tile-title>
            <v-list-tile-sub-title v-if="contact.user.description">{{ contact.user.description }}</v-list-tile-sub-title>
        </v-list-tile-content>
    </v-list-tile>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props: ['contact'],
        computed: {
            loading() {
                return this.$store.getters.isLittleLoadingActive;
            }
        },
        methods: {
            openConversation() {
                if(!this.loading)
                    this.$store.dispatch('addConversation', this.contact.user)
            }
        }
    }
</script>
<style>

</style>