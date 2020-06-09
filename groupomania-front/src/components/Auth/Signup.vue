<template>
    <div class="signup" v-if="form">
        <v-form class="signup__form" ref="form" v-model="valid">
            <!--<label for="prenom">Prénom :</label>
            <input v-model="dataSignup.firstName" type="text" id="prenom">

            <label for="nom">Nom :</label>
            <input v-model="dataSignup.lastName" type="text" id="nom">

            <label for="email">Email :</label>
            <input v-model="dataSignup.email" type="email" id="email">

            <label for="password">Mot de passe :</label>
            <input v-model="dataSignup.password" type="password" id="password">-->
            <v-text-field  v-model="dataSignup.firstName" :rules="nameRules" label="Prénom" prepend-icon="mdi-account-circle" autofocus required></v-text-field>
            <v-text-field  v-model="dataSignup.lastName" :rules="nameRules" label="Nom" prepend-icon="mdi-account-circle" required></v-text-field>
            <v-text-field  v-model="dataSignup.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" required></v-text-field>
            <v-text-field  v-model="dataSignup.password" :rules="passRules" type="password" label="mot de passe" prepend-icon="mdi-lock" required></v-text-field>

            <!--button @click.prevent="sendSignup">Envoyer</button>-->
        </v-form>
        <v-btn :disabled="!valid" class="success" @click="sendSignup()">Envoyer</v-btn>
        <p v-if="msg">{{ message }}</p>

    </div>
</template>
<script>
import axios from "axios"

export default {
    name : "Signup",
    data(){
        return{
            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passRules: [
                v => !!v || 'Password is required'
            ],
            dataSignup:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            }, 
            form: true,
            msg: false,
            message: ""
        }
    },
    methods: {
        sendSignup(){
            axios.post('http://localhost:3000/api/auth/signup', this.dataSignup)
            .then(response => {
                //console.log(response);
                this.message = response.data.message;
                this.form = false;
                this.msg = true;
            })
            .catch(error => {
                console.log(error);
                this.message = error;
                this.msg = true; 
                });
            

        }
    }
}
</script>
<style lang="scss">
    .signup{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
        margin-top: 7%;
        width: 350px;
        background-color: rgba(255,255,255,0.7);
        border-radius: 10px;
        &__form{
            width: 100%;
        }
    }
</style>