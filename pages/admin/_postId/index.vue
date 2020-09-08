<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import axios from "axios";
import { mapActions } from "vuex";

export default {
  middleware: ["check-auth", "auth"],
  components: {
    AdminPostForm
  },

  asyncData(context) {
    // if (context.payload) {
    //   return {
    //     loadedPost: context.payload.postData
    //   };
    // }
    // 上面這段是在 nuxt.config裡面generate一開使就有打api產生靜態頁面 就不用再打一次了
    return axios
      .get(process.env.baseUrl + "/posts/" + context.params.postId + ".json")
      .then(res => {
        return {
          loadedPost: { ...res.data, id: context.params.postId }
        };
      })
      .catch(e => context.error());
  },

  methods: {
    ...mapActions(["editPost"]),
    onSubmitted(editedPost) {
      this.editPost(editedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  }
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
