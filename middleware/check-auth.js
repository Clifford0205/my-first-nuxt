export default function(context) {
  // console.log("Check Auth");
  // console.log("context.req", context.req);
  // Only available on the Server-side
  console.log("近來middleWare");
  context.store.dispatch("user/initAuth", context.req);
}
