export default function(context) {
  // console.log("just Auth");
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/admin/auth");
  }
}
