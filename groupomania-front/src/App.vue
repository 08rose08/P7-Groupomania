<template>
  <div id="app">
    <auth v-if="this.$store.state.afficheAuth"/> 
    <accueil v-if="!this.$store.state.afficheAuth"/>
  </div>
</template>

<script>
import Auth from "./components/Auth.vue"
import Accueil from "./components/Accueil.vue"

export default {
  name: "App",
  data(){
    return{
      //afficheAuth: true,
      //afficheAccueil: false,
      
    }
  },
  components: {
    "auth": Auth,
    "accueil": Accueil
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
#app{
  background-color: black
  
}

</style>
