<template>
    <v-container fluid id="registration" class="component">
        <v-layout row wrap justify-space-around>
            <v-flex md6>
                <v-card>
                    <v-toolbar dark>
                        <v-toolbar-title>Create account <v-icon>assignment</v-icon></v-toolbar-title>
                    </v-toolbar>
                    <div slot="body" class="pa-3">
                        <form @submit.prevent="register">
                            <v-text-field primary label="Email" autofocus v-model="email"></v-text-field>
                            <v-text-field primary label="Username" v-model="username"></v-text-field>
                            <v-text-field primary label="Password" type="password" v-model="password"></v-text-field>
                            <v-text-field primary label="Retype password" type="password" v-model="re_password"></v-text-field>
                            <v-btn primary type="submit">Create account</v-btn>
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
                username: "",
                password: "",
                re_password: ""
            }
        },
        methods: {
            register() {
                // obsluzenie rejestracji
                console.log('register');
            }
        }
    }
</script>
<style>
    
</style>