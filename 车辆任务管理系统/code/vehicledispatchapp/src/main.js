import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)
Vue.config.productionTip = false

/*引入vant*/
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
/*end*/

/*引入DatetimePicker 时间选择*/
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);
/*end*/

/*弹出层*/
import { Popup } from 'vant';
Vue.use(Popup);
/*end*/

/*Field输入框*/
import { Field } from 'vant';
Vue.use(Field);
/*end*/

/*form表单*/
import { Form } from 'vant';
Vue.use(Form);
/*end*/

/*picker选择器*/
import { Picker } from 'vant';
Vue.use(Picker);
/*end*/

/*icon图标*/
import { Icon } from 'vant';
Vue.use(Icon);
/*end*/

/*Button 按钮*/
import { Button } from 'vant';
Vue.use(Button);
/*end*/

/*引入rem标准*/
import '@/assets/phone.js'
/*end*/
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
