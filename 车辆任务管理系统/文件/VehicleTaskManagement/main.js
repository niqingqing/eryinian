import Vue from 'vue'
import App from './App'
import store from './store'
import mpopup from './components/xuan-popup/xuan-popup.vue' //引入

Vue.config.productionTip = false

function showPopup(list) {
	store.commit("commit_mpopup", list)
}
App.mpType = 'app'
Vue.component('my-popup', mpopup);
//注册全局
Vue.prototype.$store = store;
Vue.prototype.$showPopup = showPopup;

const app = new Vue({
	...App
})
app.$mount()