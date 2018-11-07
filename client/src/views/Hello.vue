<template>

<v-container>

    <v-layout row wrap>
        <v-flex xs12>
            <v-card color="primary">
                <v-form>
                    <v-container>
                        <v-layout row wrap>
                            <v-text-field v-model="place" label="Encontrar o contacto de..." outline></v-text-field>
                            <v-text-field v-model="location" label="No Local..." outline></v-text-field>
                            <v-tooltip bottom>
                                <v-btn v-bind:to="{ name: 'get', params: { place: get  } }" dark fab medium slot="activator">
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
                        <v-carousel-item v-for="contact in contactsCache" :key="contact._id" :src="'http://localhost:8081/'+contact.contactImage" style="opacity: 0.6" >
                            <div class="contentCarousel">
                                 <v-card-text class="px-0">
                                   {{contact.nome}} <br>
                                 {{contact.morada}}<br>
                               {{ contact.freguesia}}<br>
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
                                <v-card-text>
                                    <span class="grey--text"> {{ contact.nome }}</span><br>
                                    <span> {{ contact.morada }}</span><br>
                                    <span>{{ contact.codigopostal }}</span>
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
                            <v-card dark color="secondary">
                               

                            </v-card>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <div id="contactCache">
            <div v-for="contact in contactsCache" :key="contact._id">
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
    data() {
        return {
            contactsCache: []
        };
    },
    mounted() {
        this.getcache();
    },
    methods: {
        async getcache() {
            const response = await PostsService.fetchContact();
            this.contactsCache = response.data;
            console.log(contactsCache);
        }
    }
};
</script>
<style scoped>
.contentCarousel {
    text-align: center;
    color: black;
  font-size:150%;
}
</style>
