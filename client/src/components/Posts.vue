<template>
  <div class="posts">
    <h1>Gestão de Contactos</h1>
    <div v-if="posts.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewPost' }" class="">Adicionar Empresa</router-link>
      </div>
      <table>
        <tr>
          <td>Nome da Empresa</td>
          <td width="550">Morada</td>
          <td>Fone</td>
          <td width="550">Codigo Postal</td>
          <td>Freguesia</td>
          <td width="550">Latitude</td>
          <td width="550">Longitude</td>
          <td width="100" align="center">Ação</td>
        </tr>
        <tr v-bind:key="post.id" v-for="post in posts">
          <td>{{ post.nome }}</td>
          <td>{{ post.morada }}</td>
          <td>{{ post.fone }}</td>
          <td>{{ post.codigopostal }}</td>
          <td>{{ post.freguesia }}</td>
           <td>{{ post.latitude }}</td>
          <td>{{ post.longitude }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditPost', params: { id: post._id } }">Editar</router-link> |
            <a href="#" @click="deletePost(post._id)">Deletar</a>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      Não há empresas cadastradas .. Vamos adicionar uma agora !!! <br /><br />
      <router-link v-bind:to="{ name: 'NewPost' }" class="add_post_link">Adicionar Empresa</router-link>
    </div>
  </div>
  
</template>


<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data.posts
    },
    async deletePost (id) {
      await PostsService.deletePost(id)
      this.getPosts()
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
