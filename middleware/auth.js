export default function(context) {
  // console.log("just Auth");
  console.log("登入狀態", context.store.getters["user/isAuthenticated"]);
  if (!context.store.getters["user/isAuthenticated"]) {
    context.redirect("/admin/auth");
  }
}
