// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAZUmEiFhpW_wVsa-VT9o1Y_TOE3BCGidg'
  } 
})
// GOOGLEKEY AIzaSyAZUmEiFhpW_wVsa-VT9o1Y_TOE3BCGidg
Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: '#FFEB3B',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
