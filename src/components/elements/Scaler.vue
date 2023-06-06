<template>
  <input
    type="range"
    min="0.22"
    max="0.66"
    step="0.22"
    v-model="zoom"
    v-on:input="(e) => handleChange(e)"
    id="scaler"
    ref="elem"
  />
</template>

<script>
export default {
  name: "Scaler",
  data: () => ({
    zoom: "0.44",
    elem: null,
  }),

  mounted() {
    this.handleChange();
  },

  methods: {
    handleChange(e) {
      let target;
      if (e && e.hasOwnProperty("target")) target = e.target;
      else target = this.$refs.elem;

      this.$emit("rangeChange", target);

      const min = target.min;
      const max = target.max;
      const val = target.value;

      target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 150;
  border: 1px #000 solid;
  cursor: grab;
  -webkit-appearance: none;
  width: 20vw;
  height: 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  background-image: linear-gradient($clr-emerald, $clr-emerald);
  background-repeat: no-repeat;
  opacity: 0.2;
  transition: opacity 0.2s ease-in;
  opacity: 0.2;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 2px 0 $clr-emerald;
    border: 0.5px $clr-emerald solid;
    transition: background 0.3s ease-in-out;
  }

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}
</style>
