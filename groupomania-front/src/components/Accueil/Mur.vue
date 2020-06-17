<template>
    <v-app id="mur" class="mur">
        <top-header/>
        <div class="ml-12">

            <h1 class="ma-4">Le mur</h1>
            <!--<form-post v-if="afficheFrmPst" />-->
            <router-view></router-view>
            <!--<div v-if="affichePsts">-->
                <v-container >
                    <v-btn class="ma-3" @click="afficheForm">Créer un post</v-btn>
                    <!--posts-->
                    <v-card class="mur__post ma-3 mt-6" v-for="(post, index) in allPosts" v-bind:key="index">
                        <div class="d-flex justify-space-between">
                            <v-card-title>
                                <h2 class="mur__post__title ml-0">{{ post.title }}</h2>
                            </v-card-title>
                            <v-card-actions class=" mur__post__manage" v-if="post.userId == userId">
                                <v-btn class=" mur__post__manage--btn" title="modifier le post" @click.stop="goDialogUpPost(post.title, post.content, post.id)" icon>
                                    <v-icon>mdi-pencil-outline</v-icon>
                                </v-btn>
                                <v-btn class=" mur__post__manage--btn" title="supprimer le post" @click="deletePost(post.id)" icon>
                                    <v-icon>mdi-delete-outline</v-icon>
                                </v-btn> 
                            </v-card-actions>

                        </div>

                        <v-card-subtitle class=" mur__post__name">
                            Par {{ post.firstName }} {{ post.lastName }}, le {{ post.date }} à {{ post.time }}
                        </v-card-subtitle>

                        <v-card-text class="v-card-text black--text mur__post__content" >
                            {{ post.content }}
                        </v-card-text>


                        <v-card-text class="py-0">
                            <v-btn fab title="like ?" class="ma-3" color="rgb(255,215,215)"  @click="likePost(post.id, post.likes)">
                                    <v-icon >mdi-heart-outline</v-icon>
                            </v-btn> 
                            {{ post.likes }}
                            <v-icon>mdi-heart-outline</v-icon>
                             
                            <v-btn text @click="afficheCom(post.id)" title="voir les commentaires">
                                <v-icon>mdi-comment-eye-outline</v-icon>
                                Commentaire.s<!--: {{ nbCom[post.id-1].nbComments }}-->
                            </v-btn>
                        </v-card-text>

                        <!--update post - form-->
                
                        <v-dialog v-model="dialogUpPost" max-width="500px">
                            <v-card>
                                <v-card-title>Modifier mon post</v-card-title>
                                <v-card-text>
                                    <v-form ref="form" v-model="valid">
                                        <v-text-field v-model="dataPost.title" :rules="titleRules" :counter="50" label="Titre"></v-text-field>
                                        <v-textarea v-model="dataPost.content" :rules="contentRules" label="Commentaire"></v-textarea>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn text @click="dialogUpPost=false">Annuler</v-btn>
                                    <v-btn text :disabled="!valid" @click="updatePost()">Valider</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        
                        
                        <!--comments-->
                        <div class="mur__comments" v-if="postId === post.id">
                            <v-card class="mur__comments--ind my-1 mx-2 pa-3 " color="rgba(255,215,215,0.3)" v-for="(comment, index) in allComments" v-bind:key="index" outlined>
                                <v-card-subtitle class="pa-0 mur__comments__name">
                                    Le {{ comment.date }}, {{ comment.firstName }} {{ comment.lastName }} commente :
                                </v-card-subtitle>

                                <v-card-text class="pa-0 text--primary mur__comments__content ">
                                    {{ comment.comContent }}
                                </v-card-text>

                                <v-card-actions class="d-flex justify-end pa-0 mur__comments__manage" v-if="comment.userId == userId">
                                    <v-btn title="modifier le commentaire" class="mur__comments__manage--btn" @click.stop="goDialogUpCom(comment.comContent, comment.id)" icon>
                                        <v-icon >mdi-pencil-outline</v-icon>
                                    </v-btn>
                                    <v-btn title="supprimer le commentaire" class="mur__comments__manage--btn" @click="deleteCom(comment.id)" icon>
                                        <v-icon >mdi-delete-outline</v-icon>
                                    </v-btn>
                                </v-card-actions>

                                <!--update comment - form-->
                                <v-dialog v-model="dialogUpCom" max-width="500px">
                                    <v-card>
                                        <v-card-title>Modifier mon commentaire</v-card-title>
                                        <v-card-text>
                                            <v-form ref="form" v-model="valid">
                                                <v-textarea v-model="dataCom.content" :rules="comContentRules" :counter="255" label="Commentaire"></v-textarea>
                                            </v-form>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-btn text @click="dialogUpCom=false">Annuler</v-btn>
                                            <v-btn text :disabled="!valid" @click="updateCom()">Valider</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            </v-card>

                            <v-btn v-if="!afficheFrmCm" title="commenter le post" class="ma-2" @click="afficheFormCom()">Commenter</v-btn>
                            
                            <!--new comment - form-->
                            <v-card v-if="afficheFrmCm">
                                <v-form  ref="form" class="ma-3" v-model="valid" v-if="form">
                                    <v-textarea background-color="rgba(255,215,215,0.3)" v-model="dataCom.content" :rules="comContentRules" :counter="255" label="Commentaire" autofocus required></v-textarea>
                                </v-form>
                                <v-btn :disabled="!valid" class="success ma-2" @click="sendCom(post.id)">Poster</v-btn>
                                <!--<p v-if="msg">{{ message }}</p>-->
                            </v-card>

                        </div>
                    </v-card>
                </v-container>
            <!--</div>-->
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
            userId: "",
            admin: "",
            //affichePsts: true,
            //afficheFrmPst: false,
            afficheFrmCm: false,
            allPosts: [],
            allLikes: [],
            allComments: [],
            postId: "",
            //nbCom: [],
            dialogUpCom: false,
            dialogUpPost: false,

            valid: true,
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 50) || 'Title must be less than 50 characters',
            ],
            contentRules: [
                v => !!v || 'Content is required',
            ],
            comContentRules: [
                v => !!v || 'Comment is required',
                v => (v && v.length <= 50) || 'Comment must be less than 50 characters',
            ],
            dataPost: {
                id: "",
                title:"",
                content:"",
                userId:"",
            },
            dataPostS: "",
            dataCom:{
                id: "",
                content:"",
                userId: ""
            },
            dataComS: "",
            dataLike:{
                userId: "",
                nbLikes: "",
                postId: "",
                liked: false,
            },
            dataLikeS: "",
            //msg: false,
            //message: "",
            form: true
            
            
        }
    },
    methods: {
        
        afficheCom(pId){
            this.postId = pId;
            this.afficheFrmCm = false;
            //console.log(pId)
            axios.get("http://localhost:3000/api/posts/" + pId + "/comments", {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    //console.log(response);
                    let com = JSON.parse(response.data);
                    //console.log(com);
                    this.allComments = com;
                    
                })
                .catch(error => {
                console.log(error);
                });
        },
        sendCom(pId){
            this.dataCom.userId = this.userId;
            this.dataComS = JSON.stringify(this.dataCom);
            console.log(this.dataComS);
            console.log(localStorage.token);
            //axios.get("http://localhost:3000/api/posts",                                      {headers:                                     {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            axios.post("http://localhost:3000/api/posts/" + pId + "/comments", this.dataComS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    //console.log(response);
                    console.log("dans sendCom");
                    //this.message=response.data.message;
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    //this.msg=true;
                    this.dataCom.content="";
                    this.dataCom.userId="";
                    this.afficheFrmCm=false;
                    //window.location.assign('http://localhost:8080/Accueil/Mur');
                })
                .catch(error => {
                    console.log("dans le catch");
                    console.log(error); //affiche pas le message 'normalement' envoyé par le back
                    this.message=error;
                    this.msg=true
                });
        },
        deletePost(pId){
            axios.delete("http://localhost:3000/api/posts/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    //console.log(response);
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8080/Accueil/Mur');

                })
                .catch(error => {
                    console.log(error);    
                })
        },
        deleteCom(cId){
            axios.delete("http://localhost:3000/api/posts/comments/" + cId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    //console.log(response);
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8080/Accueil/Mur');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        goDialogUpPost(postTitle, postContent, postId){
            this.dataPost.title = postTitle;
            this.dataPost.content = postContent;
            this.dataPost.id = postId;
            this.dialogUpPost = true;
        },
        updatePost(){
            this.dataPost.userId = localStorage.userId;
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.put("http://localhost:3000/api/posts/" + this.dataPost.id, this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    //console.log(response);
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataPost.title = "";
                    this.dataPost.content = "";
                    this.dataPost.userId = "";
                    this.dataPost.id = "";
                    //this.afficheFrmCm = false;
                    this.dialogUpPost = false;
                    window.location.assign('http://localhost:8080/Accueil/Mur');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        goDialogUpCom(comContent, comId){
            //console.log(comContent);
            this.dataCom.id = comId;
            this.dataCom.content = comContent;
            //console.log(this.dataCom.content);
            this.dialogUpCom = true; 
        },
        updateCom(){
            this.dataCom.userId = localStorage.userId;
            this.dataComS = JSON.stringify(this.dataComS);
            axios.put("http://localhost:3000/api/posts/comments/" + this.dataCom.id, this.dataComS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    //console.log(response);
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content = "";
                    this.dataCom.userId = "";
                    this.afficheFrmCm = false;
                    this.dialogUpCom = false;
                    window.location.assign('http://localhost:8080/Accueil/Mur');
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
            //this.affichePsts=false;
            //this.afficheFrmPst=true;
            this.$router.push('/Accueil/Mur/Post')
        },
        afficheFormCom(){
            this.afficheFrmCm = true
        },

        likePost(postId, nbLikes){
            //console.log(this.dataLike.liked);
            this.allLikes.forEach(element => {
                if(element.postId == postId && element.userId == localStorage.userId){
                    console.log('dans le if');
                    this.dataLike.nbLikes = nbLikes+-1;
                    this.dataLike.liked = true;
                    
                }//else{
                    //console.log('dans le else');
                    //this.dataLike.nbLikes = nbLikes+1;
                    //this.dataLike.liked = false;
                //}
            });
            if(this.dataLike.liked == false){
                console.log('dans le 2eme if');
                this.dataLike.nbLikes = nbLikes+1;
            }
            
            
            this.dataLike.userId = localStorage.userId;
            this.dataLike.postId = postId;
            //console.log(this.dataLike);
            console.log(this.dataLike.liked);
            this.dataLikeS = JSON.stringify(this.dataLike);
            axios.post("http://localhost:3000/api/posts/" + postId + "/like", this.dataLikeS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    //console.log(response);
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataLike.liked = false;
                    window.location.assign('http://localhost:8080/Accueil/Mur');

                })
                .catch(error => {
                    console.log(error);
                    this.dataLike.liked = false;
                })
        },

    },
    components: {
        "top-header": TopHeader, 
        //"form-post": FormPost,
    },
    mounted(){
        this.userId = localStorage.userId;
        //this.admin = localStorage.admin;
        axios.get("http://localhost:3000/api/posts", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                //console.log(response.data);
                let posts = JSON.parse(response.data);
                //console.log(posts);
                this.allPosts = posts;
            })
            .catch(error => {
            console.log(error); //affiche pas le message 'normalement' envoyé par le back
            });
        axios.get("http://localhost:3000/api/posts/likes", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response =>{
                //console.log(response.data);
                let likes = JSON.parse(response.data);
                //console.log(likes);
                this.allLikes = likes;
                console.log(this.allLikes);
            })
            .catch(error => {
                console.log(error)
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
        /*&__post{
            
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
        }*/
        &__comments{
            &--ind{
                position: relative;
            }
        
            /*&__manage{
                position: absolute!important;
                top: 0!important;
                right: 0!important;
                &--btn{
                    //padding:0;
                    //opacity: 0.7;
                    //min-width: 12px!important;
                    margin-left: 0!important;
    
                }
            }*/
        }
   }

    
</style>