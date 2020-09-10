import callApi from "./base/api";

export default {
  getOnePost({ postId }, cb, errCb) {
    console.log("有進來");

    return callApi({
      url: `/posts/${postId}.json`,
      method: "get",
      cb,
      errCb
    });
  }
};
