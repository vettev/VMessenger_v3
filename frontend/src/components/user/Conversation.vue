<template>
    <v-card class="conversation" transition="slide-y-transition">
        <v-toolbar class="primary">
            <v-toolbar-title>{{ conversation.user.name }}</v-toolbar-title>
        </v-toolbar>
        <div slot="body" class="conversation-messages">
            <p class="no-message pa-3" v-if="conversation.messages.length == 0">There's no messages yet, write some messages...</p>
            <p class="message pa-3" v-else v-for="message in conversation.messages">{{ message.body }}</p>
            <v-divider></v-divider>
            <form action="#" @submit.prevent="sendMessage" class="px-2">
                <v-text-field v-model="messageBody" label="Message"></v-text-field>
            </form>
        </div>
    </v-card>
</template>
<script>
    export default {
        data() {
            return {
                messageBody: ""
            }
        },
        props: ['conversation'],
        methods: {
            sendMessage() {
                this.messageBody = "";
            }
        }
    }
</script>
<style>

</style>