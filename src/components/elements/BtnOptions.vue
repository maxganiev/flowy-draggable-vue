<template>
  <button
    v-if="render"
    class="btn btn-create-separate-node"
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
    <i class="fa-solid fa-screwdriver-wrench"></i>
  </button>
</template>

<script>
import { store } from "@/store";

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
    store,
    //by default
    render: false,
    clicked: false,
  }),

  beforeMount() {
    //here we check if current user is allowed to update scheme
    this.render = store.adminsIds.includes(store.user.id);
  },
};
</script>

<style lang="scss" scoped>
.btn-create-separate-node {
  background: #000;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: $fs-lg;
}
</style>
