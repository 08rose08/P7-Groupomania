<template>
    <v-app id="accueil" class="text-center">
        <top-header/>
        <!--<header class="header d-flex">
            <router-link to="/Accueil/Profil">Profil</router-link>
            <router-link to="/Accueil/Mur">Mur</router-link>
            <router-link class="ml-auto" to="">Se déconnecter</router-link>
        </header>-->
        <!--<v-img class="mx-6" src="../assets/icon-left-font-monochrome-black.svg" alt="logo de Groupomania" aspect-ratio="1.8" contain></v-img>-->
        <h1 >Välkommen</h1>
        <!--<div class="d-flex">
            <v-btn class="ma-3 indigo darken-4 white--text" @click="afficheProfil">
                <v-icon>mdi-account-circle</v-icon>
                Profil
            </v-btn>
            <v-btn class="ma-3 teal darken-4 white--text" @click="afficheMur">
                <v-icon>mdi-view-dashboard-outline</v-icon>
                Mur
            </v-btn>
            <v-btn class="red ma-3 ml-auto">
                <v-icon>mdi-exit-to-app</v-icon>
                Se déconnecter
            </v-btn>
        </div>-->
        <!--<profil v-if="affichePrfl"/>-->
        <!--<mur v-if="afficheMr"/>-->
        <router-view></router-view>
         
    </v-app>
</template>
<script>
//import Profil from "./Accueil/Profil.vue"
//import Mur from "./Accueil/Mur.vue"
import TopHeader from "./Accueil/TopHeader"

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
        /*afficheProfil(){
            //this.afficheBtns=false;
            //this.affichePrfl=true
            this.$router.push('/Accueil/Profil')
        },
        afficheMur(){
            //this.afficheBtns=false;
            //this.afficheMr=true
            this.$router.push('/Accueil/Mur')
        }*/
    },
    components: {
        //"profil": Profil,
        //"mur": Mur,
        
        "top-header": TopHeader,
    },
}
</script>
<style lang="scss">
    #accueil{
        background: no-repeat center/80% url("../assets/icon-left-font-monochrome-black.svg") ;
    }
    .header{
        background-color: rgb(253,45,1);
        color: white;
    }
        
    
</style>