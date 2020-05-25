<template>
  <div id="app">
    <Accueil/>
  </div>
</template>

<script>
import Accueil from './components/Accueil.vue'

export default {
  name: 'App',
  components: {
    Accueil
  }
}
</script>

<style lang="scss">
#app {
  background-color: bisque;
  text-align: center;
}

</style>
