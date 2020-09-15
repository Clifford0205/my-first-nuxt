<template>
  <div class="about-page">
    <h1>This is BV</h1>
    <div class="row">
      <p class="col-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam officiis
        ab voluptatibus assumenda error quas deleniti eius? Suscipit, numquam?
        Quis aliquid non animi numquam amet voluptas dolorum sunt aspernatur
        commodi?
      </p>
      <p class="col-6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam officiis
        ab voluptatibus assumenda error quas deleniti eius? Suscipit, numquam?
        Quis aliquid non animi numquam amet voluptas dolorum sunt aspernatur
        commodi?
      </p>
    </div>
    <button @click="$bvModal.show('test-modal')">Modal-Btn</button>
    <TestModal />
  </div>
</template>

<script>
import TestModal from "@/components/Modal/TestModal";

export default {
  components: {
    TestModal
  }
};
</script>

<style scoped>
.about-page {
  text-align: center;
  padding: 30px;
}
</style>
