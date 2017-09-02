<template>
    <v-container fluid id="login" class="component mt-4">
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
                            <v-btn primary type="submit">Login</v-btn>
                        </form>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            login() {
                this.$http.post('login', {email: this.email, password: this.password}).then(
                    response => {
                        this.$store.dispatch('setUser', { user: response.body.user, token: response.body.token});
                        this.$store.dispatch('addAlert', {content: 'Login successful', type: "success"});
                    },
                    error => {
                        for(let loginError in error.body) {
                            let errors = error.body[loginError];
                            if(Array.isArray(errors)) {
                                for(let i = 0; i < errors.length; i++) {
                                    this.$store.dispatch('addAlert', {content: errors[i], type: "error"});
                                }
                            } else {
                                this.$store.dispatch('addAlert', {content: errors, type: "error"});
                            }
                        }
                    }
                );
            }
        }
    }
</script>
<style>
    
</style>