  <template>
    <div class="container">
        <div class="jumbotron text-center">
            <h1>Bem-vindo as <strong>Páginas Amarelas</strong> - Administração </h1>
              <div>
                <h3>Pesquisa</h3><h4><td></td><textarea rows="1" cols="20" placeholder="Nome" v-model="nome"></textarea>
                  <textarea rows="1" cols="20" placeholder="Morada" v-model="morada"></textarea>
                  <button class="app_post_btn" @click="addPost">Pesquisar</button></h4>
              </div>
        <div>
            <h3>Resultados mais pesquisados</h3>
            <h4>SLIDE</h4>
          </div>
          <div>
            <h3>Mapa</h3><h4>MAPA</h4>
          </div>
          <div>
            <h3>Empresass</h3><h4>Empresas</h4>
          </div>
          <router-link v-bind:to="{ name: 'Posts' }" class="add_post_link">Administrar Empresas</router-link>
        </div>
    </div>
  </template>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="scss" scoped>
    h1, h2 {
    font-weight: normal;
     }
  h3 {
    text-align: left;
  }
  h4 {
  /*definimos a largura do box*/
    /* width:900px;
       definimos a altura do box */
      height:50px;
      /* definimos a cor de fundo do box */
      background-color:#ecde12;
      /* definimos o quão arredondado irá ficar nosso box */
      border-radius: 10px;
      }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
