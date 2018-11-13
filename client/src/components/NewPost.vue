<template>


  <div class="posts">
    <h1>Adicionar Empresa</h1>
      <div class="form">
        <div>
          <input  type="text" name="nome" placeholder="NOME" v-model="nome">
          <textarea rows="1" cols="1" placeholder="MORADA" v-model="morada"></textarea>
        </div>
        <div>
          <textarea  rows="1" cols="1" placeholder="FONE" v-model="fone"></textarea>
          <textarea  rows="1" cols="1" placeholder="CODIGO POSTAL" v-model="codigopostal"></textarea>
        </div>
        <div>
          <textarea rows="1" cols="1" placeholder="FREGUESIA" v-model="freguesia"></textarea>
          <textarea rows="1" cols="1" placeholder="LATITUDE" v-model="latitude"></textarea>
          <textarea rows="1" cols="1" placeholder="LONGITUDE" v-model="longitude"></textarea>
         
        </div>
          <div>
          <button class="app_post_btn" @click="addPost">Adicionar</button>
        </div>
      </div>
  </div>
  
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'NewPost',
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
  methods: {
    async addPost () {
      await PostsService.addPost({
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
