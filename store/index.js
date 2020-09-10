import axios from "axios";
import Cookie from "js-cookie";

export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },

  addPost(state, post) {
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
    const createdPost = {
      ...post,
      updatedDate: new Date()
    };
    return axios
      .post(
        process.env.baseUrl +
          "/posts.json?auth=" +
          vuexContext.state.user.token,
        createdPost
      )
      .then(res => {
        // console.log(res);
        vuexContext.commit("addPost", {
          ...createdPost,
          id: res.data.name
        });
      })
      .catch(e => console.log(e));
  },

  editPost(vuexContext, editedPost) {
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
