<template>
  <b-modal id="test-modal" modal-class="modal-style" ref="modal">
    <template>
      <p class="modal-style-title not-one-row">修改成功</p>
      <p class="modal-style-content">請使用新密碼做登入</p>
    </template>

    <template v-slot:modal-footer>
      <button
        class="custom-btn modal-style-single-btn"
        @click="$bvModal.hide('test-modal')"
      >
        確定
      </button>
    </template>
  </b-modal>
</template>

<script>
export default {
  methods: {}
};
</script>
