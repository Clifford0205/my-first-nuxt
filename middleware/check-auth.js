export default function(context) {
  // console.log("Check Auth");
  // console.log("context.req", context.req);
  // Only available on the Server-side
  context.store.dispatch("user/initAuth", context.req);
}
