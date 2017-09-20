<template>
    <div class="dialogs">
        <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            :overlay=false>
            <v-card>
                <v-toolbar class="primary">
                    <v-btn icon @click.native="closeDialog" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Search results</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-list two-line>
                        <template v-for="result in results">
                            <v-list-tile avatar>
                                <v-subheader v-text="result.name"></v-subheader>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-toolbar>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    export default {
        props: ['results'],
        data() {
            return {}
        },
        computed: {
            dialog() {
                return this.$store.getters.isDialogOpen;
            }
        },
        methods: {
            closeDialog() {
                this.$store.dispatch('setDialog', false);
            }
        }
    }
</script>
<style>
    
</style>