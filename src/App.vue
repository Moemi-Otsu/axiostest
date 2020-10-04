<template>
  <div id="app">
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム</label>
    <input
      id="name"
      type="text"
    >
    <br><br>
    <label for="comment">コメント：</label>
    <textarea
      id="comment"
    ></textarea>
    <br><br>
    <button @click="createComment">コメントをサーバーに送る</button>
    <h2>掲示板</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      comment: ""
    };
  },
  methods: {
    createComment() {
      axios.post(
        "https://firestore.googleapis.com/v1/projects/vuejs-http-40867/databases/(default)/documents/comments"
      );
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
