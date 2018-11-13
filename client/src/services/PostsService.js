import Api from '@/services/Api'

export default {
  fetchPosts () {
    return Api().get('posts')
  },

  fetchContact() {
    return Api().get('posts/cache')
  },

  addPost (params) {
    return Api().post('posts', params)
  },

  updatePost (params) {
    return Api().put('posts/' + params.id, params)
  },

  getPost (params) {
    return Api().get('post/' + params.id)
  },
  
getPostSearch(params){
  return Api().get('post/' + params.nome, params.local)
},
  deletePost (id) {
    return Api().delete('posts/' + id)
  },
}
