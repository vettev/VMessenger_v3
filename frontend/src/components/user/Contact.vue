<template>
    <v-list-tile avatar v-bind:key="contact.id" @click="openConversation" class="contact">
        <v-list-tile-avatar>
            <img v-bind:src="contact.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title v-html="contact.user.name"></v-list-tile-title>
            <v-list-tile-sub-title v-if="contact.user.description">{{ contact.user.description }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-menu bottom right>
                <v-btn icon slot="activator" @click.native.prevent="">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                    <v-list-tile @click="removeContact">
                        <v-list-tile-title>
                            <v-icon error>delete</v-icon>
                            <span>Remove</span>
                        </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="editContact">
                        <v-list-tile-title>
                            <v-icon primary>mode_edit</v-icon>
                            <span>Edit</span>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-list-tile-action>
    </v-list-tile>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        props: ['contact'],
        computed: {
            loading() {
                return this.$store.getters.isLittleLoadingActive;
            }
        },
        methods: {
            editContact() {
                console.log('editing contact');
            },
            openConversation() {
                if(!this.loading)
                    this.$store.dispatch('addConversation', this.contact.user)
            },
            removeContact() {
                this.$store.dispatch('removeContact', this.contact.id);
            },
        }
    }
</script>
<style>

</style>