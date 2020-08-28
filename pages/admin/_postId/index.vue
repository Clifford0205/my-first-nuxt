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
  components: {
    AdminPostForm
  },

  data() {
    return {
      loadedPost: ""
    };
  },

  asyncData(context) {
    return axios
      .get(
        "https://nuxt-blog-9ecf3.firebaseio.com/posts/" +
          context.params.postId +
          ".json"
      )
      .then(res => {
        return {
          loadedPost: { ...res.data, id: context.params.postId }
        };
      })
      .catch(e => context.error());
  },

  created() {
    axios
      .get(
        "https://nuxt-blog-9ecf3.firebaseio.com/posts/" +
          this.$route.params.postId +
          ".json"
      )
      .then(res => {
        return {
          loadedPost: { ...res.data, id: this.$route.params.postId }
        };
      })
      .catch(e => console.log(e));
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
