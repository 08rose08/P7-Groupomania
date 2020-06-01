<template>
    <div>
        <form v-if="form">
            <label for="prenom">Prénom :</label>
            <input v-model="dataSignup.firstName" type="text" id="prenom">

            <label for="nom">Nom :</label>
            <input v-model="dataSignup.lastName" type="text" id="nom">

            <label for="email">Email :</label>
            <input v-model="dataSignup.email" type="email" id="email">

            <label for="password">Mot de passe :</label>
            <input v-model="dataSignup.password" type="password" id="password">

            <button @click.prevent="sendSignup">Envoyer</button>
        </form>
        <p v-if="msg">{{ message }}</p>

    </div>
</template>
<script>
import axios from "axios"

export default {
    name : "Signup",
    data(){
        return{
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
            axios
            .post('http://localhost:3000/api/auth/signup', this.dataSignup)
            .then(response => {
                //console.log(response);
                this.message=response.data.message;
                this.form=false;
                this.msg=true
            })
            .catch(error => console.log(error));
            

        }
    }
}
</script>
<style lang="scss">

</style>