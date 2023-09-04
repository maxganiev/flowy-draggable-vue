<template>
  <button class="btn-set-connector-line" @click="onClick">
    <i class="fa-solid fa-chart-line"></i>
  </button>
</template>

<script>
export default {
  name: "BtnSetConnectorLine",

  methods: {
    onClick() {
      this.$emit("onClick", this.onClick);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-set-connector-line {
  background: $clr-primary;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
}
</style>
