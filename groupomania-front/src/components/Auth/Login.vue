<template>
    <v-app class="login ma-auto mt-6">
        <v-card class="login__card" shaped>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="dataLogin.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" required autofocus></v-text-field>
                    <v-text-field v-model="dataLogin.password" :rules="passRules" type="password" label="mot de passe" prepend-icon="mdi-lock" required></v-text-field>
                </v-form>
            </v-card-text>
            
                <v-btn :disabled="!valid" class="success mb-3" @click="sendLogin()">Valider</v-btn>
                <!--<p v-if="msg">{{ message }}</p>-->
            
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
            msg: false,
            message: ""
        }
    },
    methods: {
        /*validate(){
            this.$refs.form.validate()
        },*/
        sendLogin(){
            axios.post("http://localhost:3000/api/auth/login", this.dataLogin)
                .then(response => {
                    //console.log(response);
                    //console.log(response.data.userId);
                    //console.log(response.data.token);
                    
                    this.$store.state.authObj.userId=response.data.userId;
                    this.$store.state.authObj.token=response.data.token;
                    

                    //console.log(this.$store.state.authObj);
                    this.$router.push('/Accueil');  
                })
                .catch(error => {
                    console.log(error); //affiche pas le message 'normalement' envoyé par le back
                    this.message=error;
                    this.msg=true 
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
        //width: 50%!important;
        text-align: center;
        
        
    }
</style>