<template>
  <div class="single-post-page">
    <section class="past">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">{{ loadedPost.updatedDate | date }}</div>
        <div class="post-detail">{{ loadedPost.author }}</div>
      </div>

      <p class="post-content">{{ loadedPost.content }}</p>
    </section>

    <div class="post-feedback">
      <p>
        讓我知道你在想什麼,請寄email至
        <a href="mailto:ts02690140@gmail.com">我的信箱</a>
      </p>
    </div>
  </div>
</template>

<script>
import postApi from "@/api/post";

export default {
  asyncData(context) {
    return postApi
      .getOnePost({
        postId: context.params.id
      })
      .then(res => {
        return {
          loadedPost: res
        };
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
