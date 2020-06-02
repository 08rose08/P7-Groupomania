<template>
    <v-app id="mur" class="mur">
        <top-header/>
        <h1>Le mur</h1>
        <v-btn @click="afficheForm">Créer un post</v-btn>
        <form-post v-if="afficheFrm"/>
        <div v-if="affichePsts">
            <v-card class="mur__post" v-for="(post, index) in allPosts" v-bind:key="index">
                <v-card-title>
                    <h2 class="mur__post__title">{{ post.title }}</h2>
                </v-card-title>
                <v-card-subtitle class=" mur__post__name">By {{ post.firstName }} {{ post.lastName }}, le {{ post.date }}</v-card-subtitle>
                <div class="mur__post__manage" v-if="post.id === $store.state.authObj.userId">
                    <v-btn>Supprimer</v-btn>
                    <v-btn>Modifier</v-btn>
                </div>
                <v-card-text class="v-card-text mur__post__content">{{ post.content }}</v-card-text>
                <v-card-text>Like.s : {{ post.likes }} <v-btn>Like</v-btn> <v-btn @click="afficheCom(post.id)">Commentaires : {{ nbCom[post.id-1].nbComments }}</v-btn></v-card-text>
                
                <div class="mur__comments" v-if="postId === post.id">
                    <v-card class="mur__comments--ind" v-for="(comment, index) in allComments" v-bind:key="index">
                        <v-card-subtitle class="mur__comments__name">Le {{ comment.date }}, {{ comment.firstName }} {{ comment.lastName }} commente :</v-card-subtitle>
                        <v-card-text class="mur__comments__content">{{ comment.comContent }}</v-card-text>
                    </v-card>
                </div>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import TopHeader from "./TopHeader"
import FormPost from "./FormPost"
import axios from "axios"

export default {
    name: "Mur",
    data(){
        return{
            affichePsts: true,
            afficheFrm: false,
            allPosts: [],
            allComments: [],
            postId: "",
            nbCom: [],
            
            
        }
    },
    methods: {
        afficheCom(pId){
            this.postId=pId;
            //console.log(pId)
            axios.get("http://localhost:3000/api/posts/" + pId + "/comments")
                .then(response => {
                    //console.log(response);
                    this.allComments=response.data;
                })
                .catch(error => {
                console.log(error);
                });
        },
        /*countComments(pId){
            let nbCom = this.nbCom;
            console.log("dans countComments");
            nbCom.forEach((element) => {
                if (element.postId===pId){
                    console.log(element.nbComments);
                    this.com=element.nbComments;
                    
                    return element.nbComments;
                }else{
                    this.com=0;
                    
                    return 0 ;
                }
            })  
        },*/
        afficheForm(){
            this.affichePsts=false;
            this.afficheFrm=true;
        },
    },
    components: {
        "top-header": TopHeader, 
        "form-post": FormPost,
    },
    created(){
        //console.log("mounted"); 
        axios.get("http://localhost:3000/api/posts")
            .then(response => {
                //console.log(response);
                this.allPosts=response.data;
            })
            .catch(error => {
            console.log(error); //affiche pas le message 'normalement' envoyé par le back
            });
        axios.get("http://localhost:3000/api/posts/comments")
                .then(response => {
                    this.nbCom=response.data;
                    console.log(this.nbCom);
                })
                .catch(error => {
                console.log(error);
                });
    },
}
</script>

<style lang="scss">
    /*.mur{
        padding: 2%;
        color : rgb(255,215,215);
        &__post{
            //border: solid orangered ;
            background-color: rgb(53, 53, 53);
            border-radius: 50% 20% / 10% 20%;
            padding: 6%;
            margin: 5%;
            box-shadow: 0 0 5px rgb(253,45,1);
            &__title{
                border-bottom: 1px solid orangered;
                margin: 5% 0 0 0 ; 
            }
            &__name{
                font-size: 75%;
                margin-top: 1%;
                text-align: right;

            }
            &__manage{
                text-align: right;
            }
            &__content{
                background-color: rgb(97, 97, 97);
                box-shadow: 0 0 5px rgb(253,45,1);
                padding: 2%;
            } 
        }
        &__comments{
            border-top: 1px solid rgb(253,45,1);
            &--ind{
                background-color: rgb(97, 97, 97);
                padding: 5%;
                margin: 1%;
                border-radius: 50% 20% / 10% 20%;
            }
            &__name{
                font-size: 75%;
                margin: 0
            }
            &__content{
                margin: 2% 0 0 0;
            }
        }
    }*/
</style>