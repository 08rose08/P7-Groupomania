<template>
    <v-app id="auth">
        
        <v-container class="auth">

            <div class="auth__boutons">
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
                
                component: ""
            }
        },
        
        components: {
            'login': Login,
            'signup': Signup
        }
    }
</script>

<style lang="scss">
    #auth {
        background: no-repeat center/80% url("../assets/icon-above-font.svg") ;

    }
    .auth {
        &__boutons{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-top: 25%;
            &--ind{
                margin-top: 5%;
                width: 150px ;
                
            }
        }
    }
    
</style>