export default function(context) {
  console.log("Check Auth");
  console.log(" context.req", context);
  context.store.dispatch("initAuth", context.req);
}
