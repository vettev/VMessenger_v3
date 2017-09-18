<template>
    <div id="dashboard">
        <v-layout row wrap>
            <v-flex xs12 md4 px-2 class="hidden-sm-and-down">
                <app-contacts></app-contacts>
            </v-flex>
            <v-flex xs12 md8 px-2>
                <app-conversations></app-conversations>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import Contacts from '../user/Contacts.vue';
    import Conversations from '../user/Conversations.vue';

    export default {
        components: {
            'app-contacts': Contacts,
            'app-conversations': Conversations
        },
        data() {
            return {
            }
        },
    }
</script>
<style lang="scss">
    #dashboard {
        @media screen and (min-width: 1024px) {
            margin-top: 20px;
        }
    }
</style>