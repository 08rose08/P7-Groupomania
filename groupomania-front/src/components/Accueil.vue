<template>
    <div id="accueil">
        

        <h1 >Välkommen</h1>
        <button  @click="afficheProfil">Profil</button>
        <button  @click="afficheMur">Mur</button>
        <button >Se déconnecter</button>

        <!--<profil v-if="affichePrfl"/>-->
        <!--<mur v-if="afficheMr"/>-->
        <router-view></router-view>
        
    </div>
</template>
<script>
//import Profil from "./Accueil/Profil.vue"
//import Mur from "./Accueil/Mur.vue"


export default {
    name: "Accueil",
    data(){
        return{
            //afficheBtns: true,
            //affichePrfl: false,
            //afficheMr: false
        }
    },
    methods: {
        afficheProfil(){
            //this.afficheBtns=false;
            //this.affichePrfl=true
            this.$router.push('/Accueil/Profil')
        },
        afficheMur(){
            //this.afficheBtns=false;
            //this.afficheMr=true
            this.$router.push('/Accueil/Mur')
        }
    },
    components: {
        //"profil": Profil,
        //"mur": Mur,
    },
}
</script>
<style lang="scss">
    
        
    
</style>