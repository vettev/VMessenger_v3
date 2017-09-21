<template>
    <div class="dialogs">
        <v-layout row justify-center style="position: relative;">
            <v-dialog
                v-model="dialog"
                transition="dialog-bottom-transition"
                :overlay="$vuetify.breakpoint.mdAndUp"
                absolute
                width="60%"
                :fullscreen="$vuetify.breakpoint.smAndDown">
                <v-card>
                    <v-toolbar class="primary">
                        <v-btn icon @click.native="dialog = false" dark>
                                <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Search results</v-toolbar-title>
                        </v-toolbar>
                        <v-spacer></v-spacer>
                        <v-list two-line>
                            <app-search-result v-for="result in results" :key="result.id" :result=result></app-search-result>
                            <p v-if="results.length == 0" class="pa-4">No results</p>
                        </v-list>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
    import SearchResult from './SearchResult.vue';

    export default {
        props: ['results', 'searchDialog'],
        data() {
            return {}
        },
        components: {
            'app-search-result': SearchResult
        },
        computed: {
            dialog: {
                get() {
                    return this.$store.getters.isDialogOpen;
                },
                set(value) {
                    this.$store.commit('setDialog', value);
                }
            }
        },
    }
</script>
<style>
    
</style>