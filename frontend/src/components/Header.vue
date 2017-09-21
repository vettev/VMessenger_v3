<template>
    <v-container fluid class="mb-4">
        <v-navigation-drawer
                temporary
                v-model="drawer"
                :mini-variant.sync="mini"
                overflow
                fixed
                class="hidden-md-and-up">
            <v-list>
                <v-list-tile class="mb-3" v-if="isUserLogged">
                    <v-list-tile-content class="pt-3">
                        <v-form @submit.prevent="searchUsers" style="width: 100%">
                            <v-text-field label="Search users" v-model="searchQuery"></v-text-field>
                        </v-form>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="isUserLogged"></v-divider>
                <v-list-tile
                    v-for="(item, i) in items"
                    :key="i"
                    value="true"
                    router
                    :to="item.link">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="logout" v-if="isUserLogged">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer
                temporary
                v-model="drawerRight"
                overflow
                fixed
                right
                class="hidden-md-and-up"
                v-if="isUserLogged">
            <v-list class="pt-0">
                <app-contacts></app-contacts>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed>
            <div class="hidden-md-and-up">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            </div>
            <router-link to="/" tag="div" style="cursor: pointer">
                <v-toolbar-title v-text="title"></v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <div class="hidden-md-and-up" v-if="isUserLogged">
                <v-btn flat @click.stop="drawerRight = !drawerRight"><v-icon>people</v-icon></v-btn>
            </div>
            <v-toolbar-items class="ml-3 hidden-sm-and-down">
                <v-form @submit.prevent="searchUsers" v-if="isUserLogged">
                    <v-text-field label="Search users" v-model="searchQuery"></v-text-field>
                </v-form>
                <v-btn
                    flat
                    v-for="item in items"
                    :key="item.title"
                    :to="item.link"
                    class="blue--text"
                    router>
                    <v-icon class="blue--text">{{ item.icon }}</v-icon>
                    <span class="ml-1">{{ item.title }}</span>
                </v-btn>
                <v-btn
                v-if="isUserLogged"
                @click="logout()"
                flat
                class="blue--text">
                    <v-icon class="blue--text">exit_to_app</v-icon>
                    <span class="ml-1">Logout</span>
                </v-btn>
                <v-btn
                    @click="changeTheme"
                    flat
                    v-tooltip:bottom="{ html: 'Change theme' }"
                    class="blue--text"
                    v-if="isUserLogged">
                    <v-icon class="blue--text">compare_arrows</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <app-search-results :results.sync="searchResults"></app-search-results>
    </v-container>
</template>

<script>
    import Contacts from './user/Contacts.vue';
    import SearchResults from './search/SearchResults.vue';

    export default {
        data() {
            return {
                drawer: false,
                drawerRight: true,
                mini: false,
                title: 'VMessenger',
                theme: 'dark',
                searchQuery: '',
                searchResults: [],
            }
        },
        components: {
            'app-contacts': Contacts,
            'app-search-results': SearchResults
        },
        computed: {
            isUserLogged() {
                return this.$store.getters.isUserLogged;
            },
            items() {
                let items = [
                    { icon: 'assignment', title: 'Register', link: '/register' },
                ];
                if(this.isUserLogged) {
                    items = [
                    ];
                }
                return items;
            }
        },
        methods: {
            changeTheme() {
                let app = document.getElementById('app');
                if(this.theme == 'dark') {
                    app.classList.remove('application--dark');
                    app.classList.add('application--light');
                    this.theme = 'light';
                } else if(this.theme == 'light') {
                    app.classList.remove('application--light');
                    app.classList.add('application--dark');
                    this.theme = 'dark';
                }
            },
            logout() {
                this.$store.dispatch('logout');
            },
            searchUsers() {
                this.searchResults = [];
                if(this.searchQuery) {
                    this.$http.post('search', {search_query: this.searchQuery}).then(
                        response => {
                            this.searchQuery = '';

                            if(this.drawer)
                                this.drawer = false;

                            if(response.body.users.length > 0)
                                this.searchResults = response.body.users;

                            this.$store.commit('setDialog', true);
                        }, error => {
                            this.$store.dispatch('addAlert', { type: 'error', content: 'Error. Cannot handle search request'});
                        }
                    );
                }
            }
        }
    }
</script>