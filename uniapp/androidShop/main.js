import Vue from 'vue'
import App from './App'

// import phone from 'common/phone.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
