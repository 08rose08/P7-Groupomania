<template>
    <div id="formPost">
        <form v-if="form">

            <label for="title">Titre :</label>
            <input v-model="dataPost.title" type="text" id="title">

            <label for="content">Contenu :</label>
            <input v-model="dataPost.content" type="text" id="content">

            <button @click.prevent="sendPost">Poster</button>
            <p v-if="msg">{{ message }}</p> 
        </form>
    </div>
</template>
<script>
import axios from "axios"

export default {
    name: "FormPost",
    data(){
        return{
            dataPost:{
                title: "",
                content:"",
                userId: this.$store.state.authObj.userId
            },
            msg: false,
            message: "",
            form: true,
        }
    },
    methods: {
        sendPost(){
            axios.post("http://localhost:3000/api/posts/", this.dataPost)
                .then(response => {
                    console.log(response);
                    this.message=response.data.message;
                    this.msg=true;
                    this.form=false
                })
                .catch(error => {
                    console.log(error); //affiche pas le message 'normalement' envoyé par le back
                    this.message=error;
                    this.msg=true
                });
        }
    }
}
</script>
<style lang="scss">

</style>