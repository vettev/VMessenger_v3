<template>
    <v-app dark>
        <app-header v-show="!loading"></app-header>
        <main v-show="!loading">
            <v-container fluid dark>
                <v-layout row wrap>
                    <v-flex xs12>
                        <app-alerts></app-alerts>
                    </v-flex>
                    <v-flex xs12 dark>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <v-footer v-show="!loading">
            <span>&copy; 2017</span>
        </v-footer>
        <div id="loading-screen" v-if="loading">
            <v-progress-circular indeterminate class="primary--text"></v-progress-circular>
        </div>
    </v-app>
</template>

<script>
    import Alerts from './components/Alerts.vue';
    import Header from './components/Header.vue';

  export default {
    data () {
      return {
      }
    },
    computed: {
        loading() {
            return this.$store.getters.isLoading;
        }
    },
    created () {
        this.$store.dispatch('loadUser');
    },
    components: {
        'app-alerts': Alerts,
        'app-header': Header
    }
  }
</script>

<style lang="stylus">
    @import './stylus/main'

    #loading-screen {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
