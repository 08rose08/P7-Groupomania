<template>
  <v-app id="app">
    <!--<auth /> -->
    <!--<accueil />-->
    <router-view></router-view>
  </v-app>
</template>

<script>
//import Auth from "./components/Auth.vue"
//import Accueil from "./components/Accueil.vue"

export default {
  name: "App",
  data(){
    return{
      //afficheAuth: true,
      //afficheAccueil: false,
      
    }
  },
  components: {
    //"auth": Auth,
    //"accueil": Accueil
  },
  methods: {
    
  }
}
</script>

<style lang="scss">

</style>
