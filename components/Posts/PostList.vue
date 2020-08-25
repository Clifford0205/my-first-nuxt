<template>
  <section class="post-list">
    <PostPreview
      id="1"
      :is-admin="isAdmin"
      thumbnail="https://i.imgur.com/0hThxqg.jpg"
      title="安安你好"
      previewText="這是第一篇文章"
    />
    <PostPreview
      id="2"
      :is-admin="isAdmin"
      thumbnail="https://i.imgur.com/0hThxqg.jpg"
      title="安安你好2"
      previewText="這是第二篇文章"
    />
    <PostPreview
      id="3"
      :is-admin="isAdmin"
      thumbnail="https://i.imgur.com/0hThxqg.jpg"
      title="安安你好3"
      previewText="這是第三篇文章"
    />
  </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview";

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
