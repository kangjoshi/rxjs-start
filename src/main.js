import Vue from 'vue'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
import App from './App.vue'

Vue.use(Rx, VueRx)

new Vue({
  el: '#app',
  render: h => h(App)
})
