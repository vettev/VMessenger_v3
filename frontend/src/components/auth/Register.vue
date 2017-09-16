<template>
    <v-container fluid id="registration" class="component">
        <v-layout row wrap justify-space-around>
            <v-flex md6>
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Create account <v-icon>assignment</v-icon></v-toolbar-title>
                    </v-toolbar>
                    <div slot="body" class="pa-3">
                        <form @submit.prevent="register">
                            <v-text-field primary label="Email" autofocus v-model="email"></v-text-field>
                            <v-text-field primary label="Username" v-model="name"></v-text-field>
                            <v-text-field primary label="Password" type="password" v-model="password"></v-text-field>
                            <v-text-field primary label="Retype password" type="password" v-model="re_password"></v-text-field>
                            <v-btn primary type="submit" :disabled="loading" :loading="loading">Create account</v-btn>
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
                name: "",
                password: "",
                re_password: ""
            }
        },
        computed: {
            loading() {
                return this.$store.getters.isLittleLoadingActive;
            }
        },
        methods: {
            register() {
                this.$store.dispatch('register', {
                    email: this.email,
                    name: this.name,
                    password: this.password,
                    re_password: this.re_password
                });
            }
        }
    }
</script>
<style>
    
</style>