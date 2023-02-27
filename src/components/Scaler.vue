<template>
  <input
    type="range"
    min="0"
    max="2"
    step="0.05"
    v-model="zoom"
    v-on:input="(e) => this.$emit('rangeChange', e)"
    id="scaler"
  />
</template>

<script>
export default {
  data: () => ({
    zoom: 0.7,
  }),
};
</script>

<style scoped>
input {
  z-index: 200;
  position: fixed;
  top: 50vh;
  left: -50px;
  transform: rotate(90deg);
  border: 1px #000 solid;
  cursor: grab;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #0e8a96;

  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}
</style>
