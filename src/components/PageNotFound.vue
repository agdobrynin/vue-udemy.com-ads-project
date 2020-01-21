<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-title class="red white--text subheading">
                        <span class="title">404. There is no page here.</span>
                    </v-card-title>
                    <v-card-text class="display-1 ma-7 text-center">
                        <p class="card-text">The page not found at URI : <strong>{{$route.path}}</strong></p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text block class="info darken-3 white--text">
                            <v-icon left v-text="'mdi-arrow-left'" />
                            <router-link :to="{name: 'home'}" tag="span">Back home</router-link>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

</style>