<template>
    <v-card class="conversation" transition="slide-y-transition">
        <v-toolbar class="primary">
            <v-toolbar-title>{{ conversation.user.name }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat @click="closeConversation">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <div slot="body">
            <app-messages :messages="conversation.messages"></app-messages>
            <v-divider></v-divider>
            <form action="#" @submit.prevent="sendMessage" class="px-2">
                <v-text-field v-model="messageBody" label="Message"></v-text-field>
            </form>
        </div>
    </v-card>
</template>
<script>
    import Messages from './Messages.vue';

    export default {
        data() {
            return {
                messageBody: ""
            }
        },
        components: {
            'app-messages': Messages
        },
        props: ['conversation'],
        methods: {
            closeConversation() {
                this.$store.commit('closeConversation', this.conversation.id);
            },
            sendMessage() {
                /*this.$store.dispatch('sendMessage', {
                    recipient_id: this.conversation.user.id,
                    body: this.messageBody,
                    conversation_id: this.conversation.id

                });*/
                this.messageBody = "";
            }
        }
    }
</script>
<style>
    .conversation-messages {
        max-height: 300px;
        overflow-y: auto;
    }
</style>