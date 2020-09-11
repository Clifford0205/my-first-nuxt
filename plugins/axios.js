import _ from "lodash";
import Vue from "vue";

export default function({ $axios, redirect }, inject) {
  $axios.onRequest(config => {
    console.log("Making request to " + config.url);
  });

  $axios.onResponse(res => {
    console.log(res.data);
    return { data: res.data };
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("index");
    }
  });

  // Set baseURL to something different
  $axios.setBaseURL(
    process.env.BASE_URL || "https://nuxt-blog-9ecf3.firebaseio.com"
  );

  // Inject to context as $api
}
