<template>
    <div class="alerts">
        <v-alert 
        success 
        value="true" 
        v-for="alert in successAlerts"
        :key="alert.id"
        dismissible
        v-model="alert.show"
        transition="slide-y-transition"
        >
          {{ alert.content }}
        </v-alert>

        <v-alert
        info
        value="true"
        v-for="alert in infoAlerts"
        :key="alert.id"
        dismissible
        v-model="alert.show"
        transition="slide-y-transition"
        >
          {{ alert.content }}
        </v-alert>

        <v-alert
        error
        value="true"
        v-for="alert in errorAlerts"
        :key="alert.id"
        dismissible
        v-model="alert.show"
        transition="slide-y-transition"
        >
          {{ alert.content }}
        </v-alert>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                alert: true,
            }
        },
        computed: {
            successAlerts() {
                return this.$store.getters.alertsByType('success');
            },
            infoAlerts() {
                return this.$store.getters.alertsByType('info');
            },
            errorAlerts() {
                return this.$store.getters.alertsByType('error');
            }
        },
    }
</script>
<style>
    
</style>