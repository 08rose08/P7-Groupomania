<template>
    <v-app id="auth">
        
        <v-img class="auth__logo" @click="afficheBoutons" alt="Groupomania logo" src="../assets/icon-above-font.svg" aspect-ratio="2" cover></v-img>
        <v-container class="auth">

        <div class="auth__boutons" v-if="afficheBtns">
            <v-btn class="auth__boutons--ind" @click="component='login'">Se connecter</v-btn>
            <v-btn class="auth__boutons--ind" @click="component='signup'">S'inscrire</v-btn>
        </div>
        
        <component v-bind:is="component"></component>
        </v-container>
        
    </v-app>
</template>

<script>
    import Login from "./Auth/Login.vue"
    import Signup from "./Auth/Signup.vue"

    export default {
        name : "Auth",
        data(){
            return{
                afficheBtns: false,
                component: ""
            }
        },
        methods: {
            afficheBoutons(){
                this.afficheBtns=true
            },
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
            //width: 20%;
            
            &:hover{
                cursor: pointer
            }
        }
        &__boutons{
            display: flex;
            &--ind{
                margin: 5%;
            }
        }
    }
    
</style>