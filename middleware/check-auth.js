export default function(context) {
  // console.log("Check Auth");
  console.log("context.req333", context.req);
  // Only available on the Server-side
  context.store.dispatch("initAuth", context.req);
}
