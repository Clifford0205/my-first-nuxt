<template>
  <h1>A single user,with ID: {{ $route.params.id }}</h1>
</template>

<script>
export default {
  validate({ params, query, store }) {
    console.log(params, query, store);
    // console.log(params.id);
    // return params.id == 1;
    // 驗證id要等於數字才過;
    return /^\d+$/.test(params.id);
    // return true;
  }
};
</script>
