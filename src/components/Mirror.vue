<template>
  <div
    id="flowy-node-mirror"
    class="mirror-wrapper"
    v-html="content"
    :style="style"
    :top="top"
    :left="left"
    :transform="transform"
  ></div>
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
      return `top: ${this.top}px; left: ${this.left}px; transform: ${this.transform}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.mirror-wrapper {
  position: absolute;
  z-index: 1000;
  background-color: #0e8a96;
  min-width: 300px;
  max-width: 300px;
  min-height: 200px;
  color: #fff;
  opacity: 0.6;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 1.2rem;
}
</style>
