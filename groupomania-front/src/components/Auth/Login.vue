<template>
    <v-app class="login ma-auto mt-6">
        <v-card shaped>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="dataLogin.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" required autofocus></v-text-field>
                    <v-text-field v-model="dataLogin.password" :rules="passRules" type="password" label="mot de passe" prepend-icon="mdi-lock" required></v-text-field>
                </v-form>
            </v-card-text>
            
            <v-btn :disabled="!valid" class="success mb-3" @click="sendLogin()">Valider</v-btn>
            <p v-if="msg">{{ message }}</p>
            
        </v-card>
    </v-app>
</template>
<script>

import axios from "axios"

export default {
    name : "Login",
    data(){
        return{
            valid: true,
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail invalide',
            ],
            passRules: [
                v => !!v || 'Mot de passe requis'
            ],
            dataLogin: {
                email: "",
                password: "",
            },
            dataLoginS: "",
            msg: false,
            message: ""
        }
    },
    methods: {
        sendLogin(){
            this.dataLoginS = JSON.stringify(this.dataLogin);
            axios.post('http://localhost:3000/api/auth/login', this.dataLoginS, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    let log = JSON.parse(response.data);
                    localStorage.userId = log.userId;
                    localStorage.token = log.token;
                    localStorage.moderation = log.moderation;
                    this.$router.push('/Accueil');  
                })
                .catch(error => {
                    console.log(error);
                    this.message = error;
                    this.msg = true 
                }); 
        }
    }
}
</script>
<style lang="scss">
    .login{
        position: relative;
        top : 5%;
        width: 350px;
        max-height: 200px;
        text-align: center;
    }
</style>