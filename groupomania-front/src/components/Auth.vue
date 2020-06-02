<template>
    <div id="auth" class="auth">
        <img class="auth__logo" @click="afficheBoutons" alt="Groupomania logo" src="../assets/logo.png">
        <div class="auth__boutons" v-if="afficheBtns">
            <v-btn class="auth__boutons--ind" @click="afficheLogin">Login</v-btn>
            <v-btn class="auth__boutons--ind" @click="afficheSignup">Signup</v-btn>
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
    .auth {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        &__logo{
            width: 20%;
            margin: 10%;
        }
        &__boutons{
            display: flex;
            &--ind{
                margin: 5%;
            }
        }
    }
    
</style>