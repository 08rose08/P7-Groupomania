<template>
    <div class="head">
        <nav>
            <router-link to="/Accueil">Accueil</router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name : 'TopHeader',
}
</script>

<style lang="scss">
    .head {
        
        background-color: rgb(253,45,1);
        color: black;
        position: fixed;
        top: 0;
        width: 100%;

    }
</style>