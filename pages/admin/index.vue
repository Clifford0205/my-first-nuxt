<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="$router.push({ name: 'admin-new-post' })">
        Create Post
      </AppButton>

      <AppButton style="margin-left:10px" @click="onLogout">
        Logout
      </AppButton>
    </section>

    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <PostList isAdmin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import postApi from "@/api/post";

export default {
  name: "admin",
  // layout: "admin",
  middleware: ["check-auth", "auth"],
  fetch(context) {
    return postApi
      .getAllPost(context)
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

  computed: { ...mapGetters(["loadedPosts"]) },
  methods: {
    ...mapActions("user", ["logout"]),
    onLogout() {
      this.logout();
      this.$router.push({ name: "會員登入頁" });
    }
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
