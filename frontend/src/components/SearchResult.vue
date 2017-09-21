<template>
    <v-list-tile avatar>
        <v-list-tile-title>{{ result.name }}</v-list-tile-title>
        <v-list-tile-action>
            <v-btn success class="pa-2" @click="addToContacts()">
                <span>Add to contacts</span>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>
<script>
    export default {
        props: ['result'],
        data() {
            return {}
        },
        methods: {
            addToContacts() {
                this.$store.dispatch('addContact', this.result.id);
            }
        }
    }
</script>
<style>
    
</style>