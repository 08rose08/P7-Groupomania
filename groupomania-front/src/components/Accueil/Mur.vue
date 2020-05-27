<template>
    <div id="mur" class="mur">
        <top-header/>
        <h1>Le mur</h1>
        <div class="mur__post" v-for="(post, index) in allPosts" v-bind:key="index">
            <h2>{{ post.title}}</h2>
            <p>{{ post.content }}</p>
            <p>{{ post.date }}</p>
            <p>By {{ post.firstName }} {{ post.lastName }}</p>
            <p>Likes : {{ post.likes }}</p> 
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
            allPosts: []
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
        &__post{
            border: solid orangered ;
        }
    }
</style>