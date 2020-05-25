<template>
    <div>
        <form>

            <label for="email">Email :</label>
            <input v-model="dataLogin.email" type="email" id="email">

            <label for="password">Mot de passe :</label>
            <input v-model="dataLogin.password" type="password" id="password">

            <button @click.prevent="sendLogin">Envoyer</button>
        </form>
        <p v-if="msg">{{ message }}</p>
    </div>
</template>
<script>

import axios from "axios"

export default {
    name : 'Login',
    data(){
        return{
            dataLogin: {
                email: "",
                password: "",
            },
            msg: false,
            message: ""
        }
    },
    methods: {
        sendLogin(){
            axios
            .post('http://localhost:3000/api/auth/login', this.dataLogin)
            .then(response => {
                console.log(response);
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