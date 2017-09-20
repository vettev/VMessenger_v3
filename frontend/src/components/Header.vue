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
                <v-list-tile
                    v-for="(item, i) in items"
                    :key="i"
                    value="true"
                    router
                    :to="item.link">
                    <v-list-tile-action>
                        <v-icon dark v-html="item.icon"></v-icon>
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
                <form action="#" @submit.prevent="searchUsers">
                    <v-text-field label="Search users" v-model="searchQuery"></v-text-field>
                </form>
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
        <app-search-results :dialog="searchDialog" :results="searchResults"></app-search-results>
    </v-container>
</template>

<script>
    import Contacts from './user/Contacts.vue';
    import SearchResults from './SearchResults.vue';

    export default {
        data() {
            return {
                drawer: false,
                drawerRight: true,
                mini: false,
                title: 'VMessenger',
                theme: 'dark',
                searchQuery: '',
                searchDialog: false,
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
                this.$http.post('search', {search_query: this.searchQuery}).then(
                    response => {
                        this.searchQuery = '';
                        this.$store.dispatch('setDialog', true);
                    }, error => {
                        console.log(error);
                    });
            }
        }
    }
</script>