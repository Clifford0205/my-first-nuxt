import callApi from "./base/api";

export default {
  getAllPost() {
    return callApi({
      url: `/posts.json`,
      method: "get"
    });
  },

  getOnePost({ postId }) {
    return callApi({
      url: `/posts/${postId}.json`,
      method: "get"
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
    const config = {
      data: {
        post
      }
    };
    return callApi({
      url: `/posts/${post.id}.json?auth=${userToken}`,
      method: "post",
      config
    });
  }
};
