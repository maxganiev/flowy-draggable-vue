<template>
  <button class="btn btn-remove" @click="remove()" title="Удалить узел">x</button>
</template>

<script>
export default {
  name: "BtnRemoveFlowyNode",
  props: {
    remove: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-remove {
  background: $clr-danger;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
}
</style>
