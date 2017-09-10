<template>
    <v-container fluid id="home">
        <component :is="component"></component>
    </v-container>
</template>
<script>
    import Dashboard from './Dashboard.vue';
    import Welcome from './Welcome.vue';

    export default {
        components: {
            'app-dashboard': Dashboard,
            'app-welcome': Welcome
        },
        data() {
            return {
            }
        },
        computed: {
            isUserLogged() {
                return this.$store.getters.isUserLogged;
            },
            component() {
                if(this.isUserLogged)
                    return 'app-dashboard';
                else
                    return 'app-welcome';
            }
        }
    }
</script>
<style>
</style>