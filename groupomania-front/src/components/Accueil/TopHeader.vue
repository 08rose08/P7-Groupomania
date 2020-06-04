<template>
    <div class="head ">
        <v-navigation-drawer
            v-model="drawer"
            color="rgba(253, 45, 1, 0.9)"
            expand-on-hover
            mini-variant
            mini-variant-width=45
            top
            permanent
            absolute
            dark
            class="w-50 menu__header"
        >
            <v-list dense nav class="py-0 ">
                <v-list-item two-line class="px-0 ">
                    <v-list-item-avatar>
                        <v-icon>mdi-account-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Application</v-list-item-title>
                        <v-list-item-subtitle>Subtext</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item v-for="item in items" :key="item.title">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <router-link :to=item.link>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </router-link>
                        </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name : 'TopHeader',
    data(){
        return {
            drawer: true,
            items: [
            { title: 'Accueil', icon: 'mdi-home-outline', link: '/Accueil'  },
            { title: 'Mur', icon: 'mdi-view-dashboard-outline', link: '/Accueil/Mur' },
            { title: 'Se déconnecter', icon: 'mdi-exit-to-app', link: '' },
            ],
        }
    },
}
</script>

<style lang="scss">
    a {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.9)!important 
        
    }
    a:hover {
        //text-decoration: underline white;
        color: white!important
            
    }
    .menu__header{
        position: fixed!important
    }
    
    /*.hhead {
        
        background-color: rgb(253,45,1);
        color: black;
        position: fixed;
        top: 0;
        width: 100%;

    }*/
</style>