<template>
  <button class="btn-close-modal" @click="onClose">x</button>
</template>

<script>
export default {
  name: "BtnClose",

  methods: {
    onClose() {
      this.$emit("onClose", this.onClose);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-close-modal {
  background: $clr-danger;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
}
</style>
