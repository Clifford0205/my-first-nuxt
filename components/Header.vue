<template>
  <header class="header">
    <ul class="nav-items">
      <li><nuxt-link :to="{ name: 'index' }">Home</nuxt-link></li>
      <li><nuxt-link :to="{ name: 'users' }">Users</nuxt-link></li>
    </ul>
  </header>
</template>

<style>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  background-color: #ccc;
}
</style>
