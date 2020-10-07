import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/vuejs-http-40867/databases/(default)/documents";
// レスポンスheaderに値を渡すこともできる
// axios.defaults.headers.common["Authorization"] = "asdfasdfasdf";
// axios.defaults.headers.get["Accept"] = "application/json";

new Vue({
  render: h => h(App),
}).$mount('#app');