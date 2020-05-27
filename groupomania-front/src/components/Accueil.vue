<template>
    <div id="accueil">
        

        <h1 v-if="afficheBtns">Välkommen</h1>
        <button v-if="afficheBtns" @click="afficheProfil">Profil</button>
        <button v-if="afficheBtns" @click="afficheMur">Mur</button>
        <button v-if="afficheBtns">Se déconnecter</button>

        <profil v-if="affichePrfl"/>
        <mur v-if="afficheMr"/>
        
        
    </div>
</template>
<script>
import Profil from "./Accueil/Profil.vue"
import Mur from "./Accueil/Mur.vue"


export default {
    name: "Accueil",
    data(){
        return{
            afficheBtns: true,
            affichePrfl: false,
            afficheMr: false
        }
    },
    methods: {
        afficheProfil(){
            this.afficheBtns=false;
            this.affichePrfl=true
        },
        afficheMur(){
            this.afficheBtns=false;
            this.afficheMr=true
        }
    },
    components: {
        "profil": Profil,
        "mur": Mur,
    },
}
</script>
<style lang="scss">
    #accueil{
        color: orangered;
    }
</style>