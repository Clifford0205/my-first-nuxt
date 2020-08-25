import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexContext.commit("setPosts", [
              {
                id: "1",
                title: "First Post",
                previewText: "我的第一篇文章",
                thumbnail: "https://i.imgur.com/0hThxqg.jpg"
              },

              {
                id: "2",
                title: "Second Post",
                previewText: "我的第二篇文章",
                thumbnail: "https://i.imgur.com/0hThxqg.jpg"
              }
            ]);
            resolve();
          }, 1500);
          // reject(new Error());
        });
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
