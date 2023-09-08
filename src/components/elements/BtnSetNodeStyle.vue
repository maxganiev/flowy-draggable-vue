<template>
  <button class="btn-set-node-style" @click="onClick" title="Редактировать стиль блока">
    <font-awesome-icon icon="fa-solid fa-chart-line" />
  </button>
</template>

<script>
export default {
  name: "BtnSetNodeStyle",

  methods: {
    onClick() {
      this.$emit("onClick", this.onClick);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-set-node-style {
  background: $clr-primary;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
