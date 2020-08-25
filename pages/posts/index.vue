<template>
  <div class="posts-page">
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },

  asyncData(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            {
              id: "1",
              title: "First Post",
              previewText: "我的第一篇文章",
              thumbnail: "https://i.imgur.com/0hThxqg.jpg"
            },

            {
              id: "2",
              title: "Second Post",
              previewText: "我的第二篇文章",
              thumbnail: "https://i.imgur.com/0hThxqg.jpg"
            }
          ]
        });
      }, 1500);
      // reject(new Error());
    })
      .then(data => {
        return data;
      })
      .catch(e => {
        context.error(e);
      });
  },

  created() {
    this.$store.dispatch("setPosts", this.loadedPosts);
    console.log(this.$store.getters.loadedPosts);
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
