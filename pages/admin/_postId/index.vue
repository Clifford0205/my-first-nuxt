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
import postApi from "@/api/post";
import callApi from "@/api/base/apiMiddle";
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

    let promiseData = callApi({
      url: "/posts/" + context.params.postId + ".json",
      method: "get"
    });

    console.log("data", promiseData);

    return promiseData
      .then(data => {
        console.log("裡面", data);
        return {
          loadedPost: { ...data, id: context.params.postId }
        };
      })
      .catch(function(error) {
        console.log("裡面", error);
        console.log("裡面", error.message);
      });

    // var SaveData = function() {
    //   return promiseData
    //     .then(data => {
    //       console.log("裡面", data);
    //       return {
    //         loadedPost: { ...data, id: context.params.postId }
    //       };
    //     })
    //     .catch(function(error) {
    //       console.log("裡面", error);
    //       console.log("裡面", error.message);
    //     });
    // };
    // SaveData();
    // return {
    //   loadedPost: {
    //     ...callApi({
    //       url: "/posts/" + context.params.postId + ".json",
    //       method: "get"
    //     }),
    //     id: context.params.postId
    //   }
    // };

    // callApi({
    //   url: "/posts/" + context.params.postId + ".json",
    //   method: "get"
    // });

    // return context.app.$axios
    //   .$get("/posts/" + context.params.postId + ".json")
    //   .then(data => {
    //     console.log(data);
    //     return {
    //       loadedPost: { ...data, id: context.params.postId }
    //     };
    //   })
    //   .catch(e => context.error());

    // console.log(
    //   process.env.baseUrl + "/posts/" + context.params.postId + ".json"
    // );
    // return axios
    //   .get(process.env.baseUrl + "/posts/" + context.params.postId + ".json")
    //   .then(res => {
    //     if (process.client) {
    //       console.log("本地端運行");
    //     }
    //     if (process.server) {
    //       console.log("伺服器端運行");
    //     }

    //     return {
    //       loadedPost: { ...res.data, id: context.params.postId }
    //     };
    //   })
    //   .catch(e => context.error());
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
