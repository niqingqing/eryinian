window.addEventListener('DOMContentLoaded', function () {
  var Vue = window.Vue;
  var VueQrcode = window.VueQrcode;

  Vue.component('qrcode', VueQrcode);

  new Vue({
    el: '#app',
  });
});
