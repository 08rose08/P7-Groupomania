<template>
    <div>
        <v-form ref="form" v-model="valid">

            <!--<label for="email">Email :</label>
            <input v-model="dataLogin.email" type="email" id="email">

            <label for="password">Mot de passe :</label>
            <input v-model="dataLogin.password" type="password" id="password">

            <button @click.prevent="sendLogin">Envoyer</button>-->

            <v-text-field v-model="dataLogin.email" :rules="emailRules" label="E-mail" prepend-icon="mdi-account-circle" required></v-text-field>
            <v-text-field v-model="dataLogin.password" :rules="passRules" type="password" label="password" prepend-icon="mdi-lock" required></v-text-field>
            <v-btn :disabled="!valid" class="mr-4" @click="sendLogin">Valider</v-btn>

        </v-form>
        <p v-if="msg">{{ message }}</p>
    </div>
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
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passRules: [
                v => !!v || 'Password is required'
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

</style>