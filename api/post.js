import callApi from "./base/api";

export default {
  getAllPost(context) {
    return callApi({
      url: `/posts.json`,
      method: "get",
      context
    });
  },

  getOnePost({ postId,context }) {
    return callApi({
      url: `/posts/${postId}.json`,
      method: "get",
      context
    });
  },

  addPost({ post, updatedDate, userToken }) {
    const config = {
      data: {
        ...post,
        updatedDate
      }
    };
    return callApi({
      url: `/posts.json?auth=${userToken}`,
      method: "post",
      config
    });
  },

  editPost({ post, userToken }) {
    console.log(post);
    const config = {
      data: {
        ...post
      }
    };
    return callApi({
      url: `/posts/${post.id}.json?auth=${userToken}`,
      method: "put",
      config
    });
  }
};
