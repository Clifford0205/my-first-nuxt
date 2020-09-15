export default function(context) {
  // console.log("just Auth");
  if (!context.store.getters["user/isAuthenticated"]) {
    context.redirect("/admin/auth");
  }
}
