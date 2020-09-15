<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";
import postApi from "@/api/post";
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
    // 上面這段是在 nuxt.config裡面generate一開使就有打api產生靜態頁面 就不用再打一次api了

    return postApi
      .getOnePost({
        postId: context.params.postId
      })
      .then(data => {
        return {
          loadedPost: { ...data, id: context.params.postId }
        };
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {
    ...mapActions(["editPost"]),
    onSubmitted(editedPost) {
      this.editPost(editedPost).then(() => {
        this.$router.push({ name: "會員頁" });
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
