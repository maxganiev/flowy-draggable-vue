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
      return `top: ${this.top}px; left: ${this.left}px; transform: ${this.transform}; transform-origin: 0 0;`;
    },
  },
};
</script>
