<template>
  <v-app> 
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-tile>
       <router-link to="/signin" tag="span" style="cursor:pointer">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Login
           </v-list-tile-content>
           </router-link>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary">
    <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up"> </v-toolbar-side-icon>
    <v-toolbar-title>
     <router-link to="/" tag="span" style="cursor:pointer">Páginas Amarelas</router-link>
     </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
 <router-link to="/signin" tag="span">
      <v-btn flat>
        <v-icon left>settings</v-icon>Login
        </v-btn>
        </router-link>
    </v-toolbar-items>
  </v-toolbar>
    <main> <!-- Conteudo Dinamico ficaram no <main> -->
      <router-view></router-view>
    </main>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  }
};
</script>