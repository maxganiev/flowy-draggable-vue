<template>
  <div class="transform-panel">
    <button @click="onNodeUp">&#9650;</button>
    <button @click="onNodeDown">&#9660;</button>
  </div>
</template>

<script>
export default {
  name: "TransformPanel",

  methods: {
    onNodeUp() {
      this.$emit("onNodeUp", this.onNodeUp);
    },

    onNodeDown() {
      this.$emit("onNodeDown", this.onNodeDown);
    },
  },
};
</script>

<style lang="scss" scoped>
.transform-panel {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 15px;

  button {
    font-size: 20px;
    color: #fff;

    &:hover {
      color: #fe6b0c;
      transform: scale(1.4);
      transition: all 0.2s ease-in;
    }
  }
}
</style>
