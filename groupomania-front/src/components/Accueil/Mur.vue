<template>
    <v-app id="mur" class="mur">
        <top-header/>
        <div class="ml-12">

            <h1 class="ma-4">Le mur</h1>
            <!--<form-post v-if="afficheFrmPst" />-->
            <router-view></router-view>
            <div v-if="affichePsts">
                <v-container >
                    <v-btn class="ma-3" @click="afficheForm">Créer un post</v-btn>
                    <!--post-->
                    <v-card class="mur__post ma-3 mt-6" v-for="(post, index) in allPosts" v-bind:key="index">
                        <v-card-title>
                            <h2 class="mur__post__title">{{ post.title }}</h2>
                        </v-card-title>

                        <v-card-subtitle class=" mur__post__name">
                            By {{ post.firstName }} {{ post.lastName }}, le {{ post.date }}
                        </v-card-subtitle>

                        <v-card-text class="v-card-text black--text mur__post__content" >
                            {{ post.content }}
                        </v-card-text>

                        <v-card-actions class="mur__post__manage" v-if="post.userId === $store.state.authObj.userId">
                            <v-btn class="mur__post__manage--btn" icon>
                                <v-icon title="modifier le post">mdi-pencil-outline</v-icon>
                            </v-btn>
                            <v-btn class="mur__post__manage--btn" @click="deletePost(post.id)" icon>
                                <v-icon title="supprimer le post">mdi-delete-outline</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-card-text class="py-0">
                            <v-btn fab class="ma-3" color="rgb(255,215,215)" title="liker le post">
                                <v-icon>mdi-heart-plus-outline</v-icon>
                            </v-btn> 
                            Like.s : {{ post.likes }} 
                             
                            <v-btn text @click="afficheCom(post.id)">
                                <v-icon>mdi-comment-eye-outline</v-icon>
                                Commentaire.s<!--: {{ nbCom[post.id-1].nbComments }}-->
                            </v-btn>
                        </v-card-text>
                        
                        
                        <!--comments-->
                        <div class="mur__comments" v-if="postId === post.id">
                            <v-card class="mur__comments--ind my-1 mx-2 pa-0" color="rgba(255,215,215,0.3)" v-for="(comment, index) in allComments" v-bind:key="index" outlined>
                                <v-card-subtitle class=" pb-0 mur__comments__name">
                                    Le {{ comment.date }}, {{ comment.firstName }} {{ comment.lastName }} commente :
                                </v-card-subtitle>

                                <v-card-text class="text--primary mur__comments__content ">
                                    {{ comment.comContent }}
                                </v-card-text>

                                <v-card-actions class="mur__comments__manage" v-if="comment.userId === $store.state.authObj.userId">
                                    <v-btn class="mur__comments__manage--btn" icon>
                                        <v-icon title="modifier le commentaire">mdi-pencil-outline</v-icon>
                                    </v-btn>
                                    <v-btn class="mur__comments__manage--btn" @click="deleteCom(comment.id)" icon>
                                        <v-icon title="supprimer le commentaire">mdi-delete-outline</v-icon>
                                    </v-btn>
                                </v-card-actions>

                            </v-card>

                            <v-btn v-if="!afficheFrmCm" class="ma-2" @click="afficheFormCom()">Commenter</v-btn>
                            
                            <!--comments form-->
                            <v-card v-if="afficheFrmCm">
                                <v-form  ref="form" class="ma-3" v-model="valid" v-if="form">
                                    <v-text-field v-model="dataCom.content" :rules="contentRules" label="Content" required></v-text-field>
                                </v-form>
                                <v-btn :disabled="!valid" class="success" @click="sendCom(post.id)">Poster</v-btn>
                                <!--<p v-if="msg">{{ message }}</p>-->
                            </v-card>
                        </div>
                    </v-card>
                </v-container>
            </div>
        </div>
    </v-app>
</template>

<script>
import TopHeader from "./TopHeader"
//import FormPost from "./FormPost"

import axios from "axios"

export default {
    name: "Mur",
    data(){
        return{
            affichePsts: true,
            afficheFrmPst: false,
            afficheFrmCm: false,
            allPosts: [],
            allComments: [],
            postId: "",
            //nbCom: [],

            valid: true,
            contentRules: [
                v => !!v || 'Content is required',
            ],
            dataCom:{
                content:"",
                userId: ""
            },
            //msg: false,
            //message: "",
            form: true
            
            
        }
    },
    methods: {
        getAllPosts(){
            axios.get("http://localhost:3000/api/posts")
                .then(response => {
                    //console.log(response);
                    this.allPosts=response.data;
                })
                .catch(error => {
                console.log(error); //affiche pas le message 'normalement' envoyé par le back
                });
        },
        afficheCom(pId){
            this.postId=pId;
            this.afficheFrmCm=false;
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
        sendCom(pId){
            this.dataCom.userId=this.$store.state.authObj.userId;
            axios.post("http://localhost:3000/api/posts/" + pId + "/comments", this.dataCom)
                .then(response => {
                    console.log(response);
                    //this.message=response.data.message;
                    //this.msg=true;
                    this.dataCom.content="";
                    this.dataCom.userId="";
                    this.afficheFrmCm=false
                })
                .catch(error => {
                    console.log(error); //affiche pas le message 'normalement' envoyé par le back
                    this.message=error;
                    this.msg=true
                });
        },
        deletePost(pId){
            axios.delete("http://localhost:3000/api/posts/" + pId)
                .then(response => {
                    console.log(response);
                    
                    
                })
                .catch(error => {
                    console.log(error);
                    
                })
        },
        deleteCom(cId){
            axios.delete("http://localhost:3000/api/posts/comments/" + cId)
                .then(response => {
                    console.log(response);
                    
                    
                })
                .catch(error => {
                    console.log(error);
                    
                })
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
            this.afficheFrmPst=true;
            this.$router.push('/Accueil/Mur/Post')
        },
        afficheFormCom(){
            this.afficheFrmCm=true
        }
    },
    components: {
        "top-header": TopHeader, 
        //"form-post": FormPost,
    },
    created(){
        axios.get("http://localhost:3000/api/posts")
                .then(response => {
                    //console.log(response);
                    this.allPosts=response.data;
                })
                .catch(error => {
                console.log(error); //affiche pas le message 'normalement' envoyé par le back
                });
        /*axios.get("http://localhost:3000/api/posts/comments")
                .then(response => {
                    this.nbCom=response.data;
                    console.log(this.nbCom);
                })
                .catch(error => {
                console.log(error);
                });*/
    },
}
</script>
<style lang="scss">
    h1{
        text-align: center;
    }
    
    .mur{
        &__post{
            &__manage{
                position: absolute!important;
                top: 10px!important;
                right: 10px!important;
                &--btn{
                    //opacity: 0.8;
                    //min-width: 12px!important;
                    margin-left: 0!important;
                }
            }
        }
        &__comments{
            &--ind{
                position: relative;
            }
        
            &__manage{
                position: absolute!important;
                top: 0!important;
                right: 0!important;
                &--btn{
                    //padding:0;
                    //opacity: 0.7;
                    //min-width: 12px!important;
                    margin-left: 0!important;
    
                }
            }
        }
   }

    
</style>