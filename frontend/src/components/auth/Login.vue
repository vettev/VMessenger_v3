<template>
    <div id="login" class="component mt-4">
        <v-layout row wrap justify-space-around>
            <v-flex md6>
                <v-card transition="slide-y-transition">
                    <v-toolbar dark>
                        <v-toolbar-title>Login <v-icon>lock</v-icon></v-toolbar-title>
                    </v-toolbar>
                    <div slot="body" class="pa-3">
                        <form @submit.prevent="login">
                            <v-text-field primary label="Email" autofocus v-model="email"></v-text-field>
                            <v-text-field primary label="Password" type="password" v-model="password"></v-text-field>
                            <v-btn primary type="submit" :disabled="loading" :loading="loading">Login</v-btn>
                        </form>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                email: "",
                password: ""
            }
        },
        computed: {
            loading() {
                return this.$store.getters.isLittleLoadingActive;
            }
        },
        methods: {
            setLoading(payload) {
              this.$store.dispatch('setLoading', payload);
            },
            login() {
                this.$store.dispatch('login', {email: this.email, password: this.password});
            }
        }
    }
</script>
<style>
    
</style>