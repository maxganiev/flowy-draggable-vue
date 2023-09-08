<template>
  <div v-show="loading" class="spinner-wrapper">
    <img src="https://portal.elcomspb.ru/images/loading2.gif" alt="spinner" />
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    loading: {
      default: false,
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
