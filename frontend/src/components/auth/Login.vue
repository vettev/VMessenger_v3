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
                            <v-text-field primary label="Email" autofocus></v-text-field>
                            <v-text-field primary label="Password" type="password"></v-text-field>
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
                //obsluzenie logowania
            }
        }
    }
</script>
<style>
    
</style>