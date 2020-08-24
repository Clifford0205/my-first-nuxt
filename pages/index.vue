<template>
  <div class="container">
    
    <!-- <nuxt-link to="/users">Users</nuxt-link> -->
    <nuxt-link :to="{ name: 'users' }">Users</nuxt-link>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";

export default {
  components: {
    Header
  }
};
</script>
  