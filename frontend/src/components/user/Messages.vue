<template>
    <div class="conversation-messages">
        <p class="no-message pa-3" v-if="messages.length == 0">There's no messages yet, write some messages...</p>
        <p class="message pa-3" v-else v-for="message in messages" :key="message.id">{{ message.body }}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props: ['messages'],
    }
</script>
<style>

</style>