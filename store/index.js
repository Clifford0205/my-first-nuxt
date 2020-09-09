import axios from "axios";
import Cookie from "js-cookie";
import {
  getTokenFromLocal,
  getExpirationDateFromLocal,
  getTokenFromCookie,
  getExpirationDateFromCookie,
  setTokenOnWeb,
  setExpirationDateOnWeb
} from "@/store/utils/user.js";

export const state = () => ({
  loadedPosts: [],
  token: null
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
  },

  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
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
        process.env.baseUrl + "/posts.json?auth=" + vuexContext.state.token,
        createdPost
      )
      .then(res => {
        console.log(res);
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
          vuexContext.state.token,
        editedPost
      )
      .then(res => {
        vuexContext.commit("editPost", editedPost);
      })
      .catch(err => console.log(err));
  },

  // setPosts(vuexContext, posts) {
  //   vuexContext.commit("setPosts", posts);
  // },

  authenticateUser(vuexContext, authData) {
    // 登入的URL
    let authUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.fbAPIKey;

    // 註冊的URL
    if (!authData.isLogin) {
      authUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        process.env.fbAPIKey;
    }
    return axios
      .post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(result => {
        // console.log(result);
        vuexContext.commit("setToken", result.data.idToken);
        setTokenOnWeb(result.data.idToken);
        setExpirationDateOnWeb(
          new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000
        );

        return axios.post("http://localhost:3000/api/track-data", {
          data: "Authenticated!"
        });
      })
      .catch(e => console.log(e));
  },

  initAuth(vuexContext, req) {
    let token;
    let expirationDate;
    // 要是是server端
    if (req) {
      console.log("近來server");
      if (!req.headers.cookie) {
        return;
      }
      token = getTokenFromCookie(req.headers.cookie);
      expirationDate = getExpirationDateFromCookie(req.headers.cookie);
    } else if (process.client) {
      // 要是是client端
      token = getTokenFromLocal();
      expirationDate = getExpirationDateFromLocal();
    }

    if (new Date().getTime() > expirationDate || !token) {
      console.log("No token or invalid token");
      vuexContext.dispatch("logout");
      return;
    }
    vuexContext.commit("setToken", token);
  },

  logout(vuexContext) {
    vuexContext.commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");

    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  },

  isAuthenticated(state) {
    return state.token != null;
  }
};
