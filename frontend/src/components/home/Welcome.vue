<template>
    <div id="welcome">
        <v-layout>
            <v-flex md6 offset-md3>
                <h2 slot="header" class="white--text text-center">Home</h2>
                <p class="grey--text text--lighten-1 text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, unde, voluptatem eum ipsam facilis nemo neque eveniet doloribus, adipisci velit vel. Rerum non aliquid perspiciatis, molestiae adipisci commodi tempore omnis.</p>
            </v-flex>
        </v-layout>
        <app-login></app-login>
    </div>
</template>
<script>
    import Login from '../auth/Login.vue';

    export default {
        components: {
            'app-login': Login
        },
        data() {
            return {
            }
        },
    }
</script>
<style>
    .text-center {
        text-align: center;
    }
</style>