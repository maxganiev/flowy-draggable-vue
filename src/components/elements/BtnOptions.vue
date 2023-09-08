<template>
  <button
    class="btn btn-options"
    @click="
      () => {
        callback();
        clicked = !clicked;
      }
    "
    title="Опции"
    :style="{
      ...styling,
      transform: `rotate(${clicked ? 180 : 0}deg)`,
      transition: 'transform 0.4s ease-out',
    }"
  >
    <font-awesome-icon icon="fa-solid fa-screwdriver-wrench" />
  </button>
</template>

<script>
export default {
  name: "BtnOptions",

  props: {
    callback: {
      type: Function,
      required: true,
    },

    styling: {
      type: Object,
    },
  },

  data: () => ({
    clicked: false,
  }),
};
</script>

<style lang="scss" scoped>
.btn-options {
  background: #000;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: $fs-lg;
}
</style>
