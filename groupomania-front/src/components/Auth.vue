<template>
    <div id="auth">
        <img id="auth__logo" @click="afficheBoutons" alt="Groupomania logo" src="../assets/logo.png">
        <div id="auth__boutons" v-if="afficheBtns">
            <button @click="afficheLogin">Login</button>
            <button @click="afficheSignup">Signup</button>
        </div>
        <login v-if="loginForm"/>
        <signup v-if="signupForm"/>
    </div>
</template>

<script>
    import Login from "./Auth/Login.vue"
    import Signup from "./Auth/Signup.vue"

    export default {
        name : "Auth",
        data(){
            return{
                afficheBtns: false,
                loginForm: false,
                signupForm: false
            }
        },
        methods: {
            afficheBoutons(){
                this.afficheBtns=true
            },
            afficheLogin(){
                this.loginForm=true,
                this.signupForm=false
            },
            afficheSignup(){
                this.loginForm=false,
                this.signupForm=true
            }
        },
        components: {
            'login': Login,
            'signup': Signup
        }
    }
</script>

<style lang="scss">
    #auth{
        display: flex;
        flex-direction: column;
        align-items: center;
        &__logo{
            width: 20%;
            margin: 10%;
        }
        &__boutons{
            display: flex;
        }
    }
    button{
        margin: 2%
    }
    
</style>