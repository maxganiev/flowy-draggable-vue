<template>
  <div class="transform-panel" @mouseleave="onMouseUp">
    <button @mousedown="onMouseDown" @mouseup="onMouseUp" data-direction="up">&#9650;</button>
    <button @mousedown="onMouseDown" @mouseup="onMouseUp" data-direction="down">&#9660;</button>
  </div>
</template>

<script>
export default {
  name: "TransformPanel",

  props: {
    onMouseDown: {
      type: Function,
      required: true,
    },

    onMouseUp: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.transform-panel {
  display: flex;
  flex-direction: column;
  background-color: $clr-emerald;
  border-radius: 10px 0 0 10px;
  padding: 5px;
  transform: translateX(1.5px);
  z-index: 1;

  button {
    font-size: 20px;
    color: #fff;

    &:hover {
      color: $clr-orange;
      transform: scale(1.4);
      transition: all 0.2s ease-in;
    }

    &:active,
    &:focus {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }
}
</style>
