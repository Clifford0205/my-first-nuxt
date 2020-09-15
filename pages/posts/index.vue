<template>
  <div class="posts-page">
    <PostList :posts="myloadedPosts" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import postApi from "@/api/post";

export default {
  fetch(context) {
    return postApi
      .getAllPost()
      .then(res => {
        const postsArray = [];
        for (const key in res) {
          // console.log("res.data", res.data);
          // console.log("key", key);
          postsArray.push({ ...res[key], id: key });
        }
        context.store.commit("setPosts", postsArray);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  // fetch(context) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //           {
  //             id: "1",
  //             title: "First Post",
  //             previewText: "我的第一篇文章",
  //             thumbnail: "https://i.imgur.com/0hThxqg.jpg"
  //           },

  //           {
  //             id: "2",
  //             title: "Second Post",
  //             previewText: "我的第二篇文章",
  //             thumbnail: "https://i.imgur.com/0hThxqg.jpg"
  //           }
  //         ]
  //       });
  //     }, 1500);
  //     // reject(new Error());
  //   })
  //     .then(data => {
  //       context.store.commit("setPosts", data.loadedPosts);
  //     })
  //     .catch(e => {
  //       context.error(e);
  //     });
  // },

  // asyncData(context) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve({
  //         loadedPosts: [
  //           {
  //             id: "1",
  //             title: "First Post",
  //             previewText: "我的第一篇文章",
  //             thumbnail: "https://i.imgur.com/0hThxqg.jpg"
  //           },

  //           {
  //             id: "2",
  //             title: "Second Post",
  //             previewText: "我的第二篇文章",
  //             thumbnail: "https://i.imgur.com/0hThxqg.jpg"
  //           }
  //         ]
  //       });
  //     }, 1500);
  //     // reject(new Error());
  //   })
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(e => {
  //       context.error(e);
  //     });
  // },

  // created() {
  // asyncData才要用得狀態
  //   this.$store.dispatch("setPosts", this.loadedPosts);
  //   console.log(this.$store.getters.loadedPosts);
  // },
  // middleware: "log",
  computed: {
    ...mapGetters(["loadedPosts"]),
    myloadedPosts() {
      return this.loadedPosts;
      // return this.$store.getters.loadedPosts;
    }
  }
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
