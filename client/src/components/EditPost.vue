<template>
  <div class="posts">
    <h1>Editar Empresa</h1>
      <div class="form">
        <div>
          <input type="text" name="nome" placeholder="NOME" v-model="nome">
          <textarea rows="1" cols="1" placeholder="MORADA" v-model="morada"></textarea>
        </div>
        <div>
          <textarea rows="1" cols="1" placeholder="FONE" v-model="fone"></textarea>
          <textarea rows="1" cols="1" placeholder="CODIGO POSTAL" v-model="codigopostal"></textarea>
        </div>
        <div>
          <textarea rows="1" cols="1" placeholder="FREGUESIA" v-model="freguesia"></textarea>
          <textarea rows="1" cols="1" placeholder="LATITUDE" v-model="latitude"></textarea>
          <textarea rows="1" cols="1" placeholder="LONGITUDE" v-model="longitude"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="updatePost">Atualizar</button>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'EditPost',
  data () {
    return {
      nome: '',
      morada: '',
      fone: '',
      codigopostal: '',
      freguesia: '',
      latitude: '',
      longitude: ''
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.nome = response.data.nome
      this.morada = response.data.morada
      this.fone = response.data.fone
      this.codigopostal = response.data.codigopostal
      this.freguesia = response.data.freguesia
      this.latitude = response.data.latitude
      this.longitude = response.data.longitude
    },
    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        nome: this.nome,
        morada: this.morada,
        fone: this.fone,
        codigopostal: this.codigopostal,
        freguesia: this.freguesia,
        latitude: this.latitude,
        longitude: this.longitude
      })
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style lang="scss" scoped>
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
