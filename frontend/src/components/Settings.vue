<template>
    <v-layout class="mt-4" justify-center>
        <v-flex xs12 md6>
            <v-card>
                <v-toolbar class="primary">
                    <v-toolbar-title>
                        <v-icon>settings</v-icon>
                        <span>Settings</span>
                </v-toolbar-title>
                </v-toolbar>
                <div slot="body" class="settings-content pa-3">
                    <h5>Your account settings</h5>
                    <v-form @submit.prevent="saveSettings">
                        <v-text-field model="name" label="Name"></v-text-field>
                        <v-text-field model="city" label="City"></v-text-field>
                        <v-menu
                            lazy
                            :close-on-content-click="false"
                            v-model="dateMenu"
                            transition="scale-transition"
                            offset-y
                            full-width
                            :nudge-left="40"
                            max-width="290px"
                            >
                            <v-text-field
                                model="birthdate"
                                label="Date of birth"
                                prepend-icon="event"
                                readonly
                                slot="activator">
                            </v-text-field>
                            <v-date-picker dark v-model="birthdate" no-title scrollable actions>
                                <template scope="{ save, cancel }">
                                    <v-card-actions>
                                        <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                                        <v-btn flat primary @click.native="save()">Save</v-btn>
                                    </v-card-actions>
                                </template>
                            </v-date-picker>
                        </v-menu>
                        <v-btn primary type="submit">Submit</v-btn>
                    </v-form>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                city: '',
                birthdate: '',
                dateMenu: false,
            }
        },
        computed: {
            loading() {
                return this.$store.getters.isLittleLoadingActive;
            }
        },
        created() {
            this.name = this.$store.getters.user.name;
            this.birthdate = this.$store.getters.user.birthdate;
        },
        methods: {
            saveSettings() {
                //zapisanie do bazy
            }
        }
    }
</script>