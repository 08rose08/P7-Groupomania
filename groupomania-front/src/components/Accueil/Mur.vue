<template>
    <div id="mur" class="mur">
        <top-header/>
        <h1>Le mur</h1>
        <button>Créer un post</button>
        <div class="mur__post" v-for="(post, index) in allPosts" v-bind:key="index">
            <h2 class="mur__post__title">{{ post.title}}</h2>
            <p class="mur__post__name">By {{ post.firstName }} {{ post.lastName }}, le {{ post.date }}</p>
            <div class="mur__post__manage" v-if="post.id === $store.state.authObj.userId">
                <button>Supprimer</button>
                <button>Modifier</button>
            </div>
            <p class="mur__post__content">{{ post.content }}</p>
            <p>Like.s : {{ post.likes }} <button>Like</button><button @click="afficheCom(post.id)">Commentaires : "nb"</button></p>
            
            <div class="mur__comments" v-if="postId === post.id">
                <div class="mur__comments--ind" v-for="(comment, index) in allComments" v-bind:key="index">
                    <p class="mur__comments__name">Le {{ comment.date }}, {{ comment.firstName }} {{ comment.lastName }} commente :</p>
                    <p class="mur__comments__content">{{ comment.comContent }}</p>
                </div>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import TopHeader from "./TopHeader"
import axios from "axios"

export default {
    name: "Mur",
    data(){
        return{
            allPosts: [],
            allComments: [],
            postId: "",
            //userId: this.$store.state.authObj.userId,
            
        }
    },
    methods: {
        afficheCom(pId){
            this.postId=pId;
            console.log(pId)
            axios.get("http://localhost:3000/api/posts/" + pId + "/comments")
                .then(response => {
                    console.log(response);
                    this.allComments=response.data;
                })
                .catch(error => {
                console.log(error);
                });
        }
    },
    components: {
        "top-header": TopHeader,
    },
    mounted(){
        console.log("mounted");
        axios.get("http://localhost:3000/api/posts")
            .then(response => {
                console.log(response);
                this.allPosts=response.data;
            })
            .catch(error => {
            console.log(error); //affiche pas le message 'normalement' envoyé par le back
            });
    },
}
</script>

<style lang="scss">
    .mur{
        padding: 2%;
        &__post{
            //border: solid orangered ;
            background-color: rgb(255, 236, 212);
            border-radius: 50% 20% / 10% 20%;
            padding: 6%;
            margin: 5%;
            box-shadow: 0 0 5px orangered;
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
                box-shadow: 0 0 5px orangered;
                padding: 2%;
            }
            
        }
        &__comments{
            border-top: 1px solid orangered;
            &--ind{
                background-color:rgb(240, 222, 199);
                padding: 5%;
                margin: 1%;
                border-radius: 50% 20% / 10% 20%;
            }
            &__name{
                font-size: 75%;
                margin: 0
            }
            &__content{
                margin: 0
            }
        }
    }
</style>