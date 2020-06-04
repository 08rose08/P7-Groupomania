<template>
    <div id="profil">
        <top-header/>
        <v-card class="ma-6 ml-12">
            <v-card-title>
                <h1>Profil de {{ prenom }} {{ nom }}</h1>

            </v-card-title>
            <v-card-text>
                <p>Email : {{ mail }}</p>

            </v-card-text>
        </v-card>
    </div>
</template>

<script>

import TopHeader from "./TopHeader"
import axios from "axios"

export default {
    name: "Profil",
    data(){
        return{
            prenom: "",
            nom: "",
            mail: ""
        }
    },
    mounted() { 
        //console.log("mounted");
        axios.get("http://localhost:3000/api/auth/" + this.$store.state.authObj.userId)
            .then(response => {
                //console.log("consoleLog du front");
                //console.log(response);
            this.mail=response.data[0].email;
            this.prenom=response.data[0].firstName;
            this.nom=response.data[0].lastName;
            })
            .catch(error => {
            console.log(error); //affiche pas le message 'normalement' envoyé par le back
            });    
    },
    
    components: {
        "top-header": TopHeader,

    }
}
</script>

<style lang="scss">

</style>