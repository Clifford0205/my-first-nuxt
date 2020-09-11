import axios from "axios";
import postApi from "@/api/post";

export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },

  addPost(state, post) {
    console.log("mutation", post);
    state.loadedPosts.push(post);
  },

  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.id === editedPost.id
    );
    state.loadedPosts[postIndex] = editedPost;
  }
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get(process.env.baseUrl + "/posts.json")
      .then(res => {
        const postsArray = [];
        for (const key in res.data) {
          // console.log("res.data", res.data);
          // console.log("key", key);
          postsArray.push({ ...res.data[key], id: key });
        }
        vuexContext.commit("setPosts", postsArray);
      })
      .catch(e => context.error(e));
  },

  addPost(vuexContext, post) {
    return postApi
      .addPost({
        post: post,
        updatedDate: new Date(),
        userToken: vuexContext.state.user.token
      })
      .then(res => {
        vuexContext.commit("addPost", {
          ...post,
          updatedDate: new Date(),
          id: res.name
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  editPost(vuexContext, editedPost) {
    // return postApi
    //   .editPost({
    //     post: editedPost,
    //     userToken: vuexContext.state.user.token
    //   })
    //   .then(res => {
    //     console.log(res);
    //     vuexContext.commit("editPost", editedPost);
    //   })
    //   .catch(err => console.log(err));
    return axios
      .put(
        process.env.baseUrl +
          "/posts/" +
          editedPost.id +
          ".json?auth=" +
          vuexContext.state.user.token,
        editedPost
      )
      .then(res => {
        vuexContext.commit("editPost", editedPost);
      })
      .catch(err => console.log(err));
  }

  // setPosts(vuexContext, posts) {
  //   vuexContext.commit("setPosts", posts);
  // },
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  }
};
