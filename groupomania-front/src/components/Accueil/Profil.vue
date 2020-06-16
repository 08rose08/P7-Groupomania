<template>
    <div id="profil" class="d-flex justify-center">
        <top-header/>
        <v-card class="ma-12" min-width="300px" flat>
            <v-card-title class="my-3" >
                <h1>Mon profil</h1>
            </v-card-title>

            <v-card-text class="ml-2">
                <p>Prénom : {{ dataGet.firstName }}</p>
                <p>Nom : {{ dataGet.lastName }}</p>
                <p>Email : {{ dataGet.email }}</p>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-between">
                <v-btn @click.stop="dialogUp=true" title="modifier mes informations">Modifier</v-btn>
                <v-btn @click.stop="dialogDel=true" title="supprimer mon profil">Supprimer</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog persistent v-model="dialogUp" max-width="600px">
            <v-card>
                <v-card-title>Modifier mon profil</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field v-model="dataUp.firstName" :rules="nameRules" label="Prénom" prepend-icon="mdi-account-circle" required></v-text-field>
                        <v-text-field  v-model="dataUp.lastName" :rules="nameRules" label="Nom" prepend-icon="mdi-account-circle" required></v-text-field>
                        <v-text-field v-model="dataUp.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" required></v-text-field>
                        <!--<v-text-field v-model="dataUp.password1" :rules="pass1Rules" type="password" label="mot de passe" prepend-icon="mdi-lock" ></v-text-field>
                        <v-text-field v-model="dataUp.password2" :rules="pass2Rules" type="password" label="mot de passe" prepend-icon="mdi-lock"></v-text-field>-->
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="dialogUp=false">Annuler</v-btn>
                    <v-btn text :disabled="!valid" @click="updateUser">Valider</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDel" max-width="350px">
            <v-card>
                <v-card-title>
                    Êtes-vous sûr.e ?
                </v-card-title>
                <v-card-text>
                    <p>En supprimant votre profil, vous effacerez aussi tous vos posts ainsi que vos commentaires.</p>
                    <p>{{ msg }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogDel=false">
                        Annuler
                    </v-btn>
                    <v-btn text @click="deleteUser">
                        Supprimer mon profil
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import TopHeader from "./TopHeader"
import axios from "axios"

export default {
    name: "Profil",
    data() {
        return{
            dialogDel: false,
            dialogUp: false,
            msg: "",
            dataGet: { 
                firstName: "",
                lastName: "",
                email: ""
            },
            dataUp: {
                firstName: "",
                lastName: "",
                email: "",
                //password1: "",
                //password2: "",
            },
            dataUpS: "",
            valid: true,
            nameRules: [
                v => !!v || 'Nom requis',
            ],
            emailRules: [
                v => !!v || 'E-mail requis',
                v => /.+@.+\..+/.test(v) || 'E-mail invalide',
            ],
            /*pass1Rules: [
                v => (v || '').indexOf(' ') < 0 || 'Espace.s non autorisé.s',
            ],
            pass2Rules: [
                v => (v || '').indexOf(' ') < 0 || 'Espace.s non autorisé.s',
                v => (!!v && v) === this.dataUp.password1 || 'Les mots de passe doivent être identiques'
            ],*/
        }
    },
    methods: {
        deleteUser() {
            
            axios.delete("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                //console.log(response.data);
                let rep = JSON.parse(response.data);
                console.log(rep);
                localStorage.userId = "";
                localStorage.token = "";
                //console.log(this.$store.state.authObj);
                this.$router.push('/');  
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        },
        updateUser() {
            //console.log("c'est cliqué");
            this.dataUpS = JSON.stringify(this.dataUp);
            axios.put("http://localhost:3000/api/auth/", this.dataUpS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                //console.log(response.data);
                let rep = JSON.parse(response.data);
                console.log(rep);
                //this.$store.state.authObj.userId = "";
                //this.$store.state.authObj.token = "";
                //console.log(this.$store.state.authObj);
                //this.$router.push('/');
                this.dialogUp = false;
                window.location.assign('http://localhost:8080/Accueil/Profil');
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        }
    },
    mounted() { 
        //console.log("mounted");
        //console.log(localStorage.userId);
        //axios.get("http://localhost:3000/api/auth/" + this.$store.state.authObj.userId, {headers: {Authorization: 'Bearer ' + this.$store.state.authObj.token}})
        axios.get("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})

            .then(response => {
                //console.log("consoleLog du front");
                //console.log(response.data);
                let profil = JSON.parse(response.data);
                //console.log(profil);
                this.dataGet.email = profil[0].email;
                this.dataGet.firstName = profil[0].firstName;
                this.dataGet.lastName = profil[0].lastName;
                this.dataUp.email = profil[0].email;
                this.dataUp.firstName = profil[0].firstName;
                this.dataUp.lastName = profil[0].lastName;
            })
            .catch(error => {
                console.log(error);
                //affiche pas le message 'normalement' envoyé par le back
            });    
    },
    
    components: {
        "top-header": TopHeader,

    }
}
</script>

<style lang="scss">

</style>