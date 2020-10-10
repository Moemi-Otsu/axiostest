import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

Vue.config.productionTip = false;

axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/vuejs-http-40867/databases/(default)/documents";
// レスポンスheaderに値を渡すこともできる
// axios.defaults.headers.common["Authorization"] = "asdfasdfasdf";
// axios.defaults.headers.get["Accept"] = "application/json";

// リクエストと処理が帰ってくる間に共通の処理を入れることができるinterceptors
// サーバーにリクエストを送る前に処理入れるrequest
const interceptorsRequest = axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // これだとthenに入ってしまう。
    //  return error;
    // 下記のようにかくと、catchに入る。
    return Promise.reject(error);
  }
);
// サーバーからデータをとってきてthenに渡す前に処理入れるresponse
const interceptorsResponse = axios.interceptors.response.use(
  response => {
    console.log('interceptors response', response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.request.eject(interceptorsResponse);
axios.interceptors.request.eject(interceptorsRequest);

new Vue({
  render: h => h(App),
}).$mount('#app');