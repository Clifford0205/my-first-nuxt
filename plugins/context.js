export default (context, inject) => {
  //   const globalContext = () => {
  //     console.log("xxx");
  //     console.log(context);
  //     return context;
  //   };
  //   inject("globalContext", globalContext);
  global.globalContext = context;
};
