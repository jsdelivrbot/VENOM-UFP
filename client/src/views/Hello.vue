<template>
<v-container>
    <v-layout row wrap >
        <v-flex xs12 >
            <v-card>
                <v-form >
                    <v-container>
                        <v-layout row wrap >
                            <v-text-field  color="secondary" v-model="nome" label="Encontrar o contacto de..." outline></v-text-field>
                            <v-text-field color="secondary" v-model="local" label="No Local..." outline></v-text-field>
                            <v-tooltip bottom>
                                <v-btn type="submit" v-on:click="getPostSearch" dark fab medium slot="activator">
                                    <v-icon>search</v-icon>
                                </v-btn>
                                <span>Pesquisar</span>
                            </v-tooltip>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card>
        </v-flex>
        <v-flex xs12>
            <v-card dark color="primary">
                <v-card-text class="px-0">
                    <v-carousel height="200">
                        <v-carousel-item v-for="contact in contactsCache" :key="contact._id" :src="'http://localhost:8081/'+contact.contactImage">
                            <div class="contentCarousel">
                                <v-card-text >
                                    {{contact.nome}} <br>
                                    {{contact.morada}}<br>
                                    {{contact.freguesia}}<br>
                                    {{contact.fone}}</v-card-text>
                            </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-content>
            <v-container>
                <v-layout row wrap align-center>
                    <v-flex xs12 md5 offset-md0>
                        <div v-for="contact in contactsCache" :key="contact.nome">
                            <v-card class="my-1" hover>
                                <v-card-media class="dark--text" height="170px" :src="'http://localhost:8081/'+contact.contactImage">
                                    <v-container fill-height fluid>
                                        <v-layout>
                                            <v-flex xs12 align-end d-flex>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-media>
                                <v-card-text class="secondary">
                                    <span class="white--text"> {{ contact.nome }}</span><br>
                                    <span class="white--text"> {{ contact.morada }}</span><br>
                                    <span class="white--text">{{ contact.codigopostal }}</span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-card-text>{{contact.freguesia}}</v-card-text>
                                    <v-card-text>{{contact.fone}}</v-card-text>
                                    <v-card-text>
                                        <v-btn color="primary" dark large relative bottom right fab>
                                            <v-icon>call</v-icon>
                                        </v-btn>
                                    </v-card-text>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </v-flex>
                    <v-flex xs12 md4>
                        <div class="text-xs-center">
                            <GmapMap :center="{lat:41.172873, lng:-8.611798}" :zoom="7" map-type-id="terrain" style="width: 500px; height: 300px">
                                <GmapMarker :key="index" v-for="(m, index) in contactsCache" 
                                var indexposition=new google.maps.LatLng(m.latitude, m.longitude); 
                                console.log(indexposition) 
                                :position="indexposition" 
                                :clickable="true" 
                                :draggable="true" @click="center=m.position" />
                            </GmapMap>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <div id="contactCache">
            <div v-for="contact in searchResult" :key="contact._id">
                <P> {{contact}} </p>
            </div>
        </div>
    </v-layout>
</v-container>
</template>

<script>
import PostsService from "@/services/PostsService";

export default {
    name: "contactCache",
    name: "getPostSearch",
    data() {
        return {
            contactsCache: [],
            searchResult: [],
            nome: null,
            local: null,
        };
    },
    mounted() {
        this.getcache();
        this.getPostSearch();

    },
    methods: {
        async getcache() {
            const response = await PostsService.fetchContact();
            this.contactsCache = response.data;
            console.log(contactsCache);
        },
        async getPostSearch() {
            const responde = await PostsService.getPostSearch({
                nome: this.nome,
                freguesia: this.local
            })
                this.searchResult = responde.data;
            }
    }
};
</script>

<style scoped>
.contentCarousel {
    text-align: center;
    font-size: 150%;
    background-color: black;
    opacity: 0.6;
}
</style>
