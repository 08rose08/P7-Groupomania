<template>
    <v-app id="formPost">
        <top-header/>
        <h1 class="ml-12">Le mur</h1>
        <v-card class="ma-3 ml-12">
            <v-card-title class="mb-3">
                <h2>Nouveau post </h2>
            </v-card-title>
            
            <v-card-text>
                <v-form ref="form" class="ma-3" v-model="valid" >
                    <v-text-field v-model="dataPost.title" :rules="titleRules" label="Title" autofocus required></v-text-field>
                    <v-textarea v-model="dataPost.content" :rules="contentRules" label="Content" required></v-textarea>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn  :disabled="!valid" class="success" @click="sendPost">Poster</v-btn>
            </v-card-actions>
        </v-card>
        
        
        <!--<p v-if="msg">{{ message }}</p> -->
    </v-app>
</template>
<script>
import axios from "axios"
import TopHeader from "./TopHeader"


export default {
    name: "FormPost",
    data(){
        return{
            valid: true,
            titleRules: [
                v => !!v || 'Title is required',
            ],
            contentRules: [
                v => !!v || 'Content is required',
            ],
            dataPost:{
                title: "",
                content:"",
                userId: this.$store.state.authObj.userId
            },
            msg: false,
            message: "",
            
            
        }
    },
    methods: {
        sendPost(){
            axios.post("http://localhost:3000/api/posts/", this.dataPost)
                .then(response => {
                    console.log(response);
                    this.message=response.data.message;
                    this.msg=true;
                    this.form=false;
                    this.$router.push('/Accueil/Mur')
                    
                })
                .catch(error => {
                    console.log(error); //affiche pas le message 'normalement' envoyé par le back
                    this.message=error;
                    this.msg=true
                });
        },
    },
    components: {
        "top-header": TopHeader, 
        
    },
}
</script>
<style lang="scss">

</style>