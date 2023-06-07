<template>
  <div id="flowy-node-mirror" class="mirror-wrapper" v-html="content" :style="style"></div>
</template>

<script>
export default {
  name: "Mirror",
  props: {
    content: {
      type: String,
      required: true,
    },

    top: {
      type: Number,
      required: true,
    },

    left: {
      type: Number,
      required: true,
    },

    transform: {
      type: String,
      required: true,
    },
  },

  computed: {
    style() {
      return `top: ${this.top}px; left: ${this.left}px; transform: ${this.transform}; transform-orign: top right;`;
    },
  },
};
</script>

<style lang="scss" scoped>
.mirror-wrapper {
  position: absolute;
  z-index: 1000;
  background-color: $clr-emerald;
  width: 320px;
  height: 200px;
  color: #fff;
  opacity: 0.6;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: $fs-sm;
  padding: 5px 10px;
  border-radius: 30px;
}
</style>
