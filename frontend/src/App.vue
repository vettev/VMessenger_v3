<template>
    <v-app dark>
        <app-header v-if="!loading"></app-header>
        <main v-if="!loading">
            <v-container fluid>
                <app-alerts></app-alerts>
                <router-view></router-view>
            </v-container>
        </main>
        <v-footer v-if="!loading">
            <span>&copy; 2017</span>
        </v-footer>
        <div id="loading-screen" v-if="loading" transition="fade-transition">
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
          theme: 'dark'
      }
    },
    computed: {
        loading() {
            return this.$store.getters.isLoadingActive;
        }
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
        background: rgba(black, 0.25);
        animation: fadeIn 0.5s;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
