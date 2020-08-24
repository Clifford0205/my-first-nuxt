<template>
  <div>
    <input type="text" v-model="userId" />
    <button @click="onLoadUser">Load User</button>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: ""
    };
  },

  methods: {
    onLoadUser() {
      console.log(this.userId);
      //   this.$router.push("/users/" + this.userId);
      this.$router.push({ name: "users-id", params: { id: this.userId } });
    }
  },

  layout: "users"
};
</script>
