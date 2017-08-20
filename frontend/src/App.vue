<template>
  <v-app dark>
    <app-header></app-header>
    <main>
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
    <v-footer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
    import Alerts from './components/Alerts.vue';
    import Header from './components/Header.vue';

  export default {
    data () {
      return {
        title: 'Vuetify.js',
      }
    },
    components: {
        'app-alerts': Alerts,
        'app-header': Header,
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
