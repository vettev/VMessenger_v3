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
            component() {
                console.log('Home - component');
                if(this.$store.getters.isUserLogged)
                    return 'app-dashboard';
                else
                    return 'app-welcome';
            }
        }
    }
</script>
<style>
</style>