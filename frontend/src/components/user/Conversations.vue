<template>
    <div class="conversations">
        <div class="center" v-if="loading">
            <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
        </div>
        <app-conversation v-for="conversation in conversations" :key="conversation.id" :conversation="conversation"></app-conversation>
    </div>
</template>
<script>
    import Conversation from './Conversation.vue';

    export default {
        data() {
            return {
            }
        },
        components: {
            'app-conversation': Conversation
        },
        computed: {
            loading() {
              return this.$store.getters.isLittleLoadingActive;
            },
            conversations() {
                return this.$store.getters.conversations;
            }
        },
    }
</script>
<style>

</style>