<template>
  <button
    class="btn-set-connector-line"
    @click="onClick"
    title="Изменить текущий вид соединительной линии"
  >
    <font-awesome-icon icon="fa-solid fa-chart-line" />
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
