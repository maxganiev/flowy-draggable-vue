<template>
  <div class="transform-panel" @mouseleave="onMouseUp">
    <button @mousedown="onMouseDown" @mouseup="onMouseUp" data-direction="up" class="full-row">
      &#9650;
    </button>
    <button @click="onClick" data-direction="left">&#9664;</button>
    <button @click="onClick" data-direction="right">&#9654;</button>
    <button @mousedown="onMouseDown" @mouseup="onMouseUp" data-direction="down" class="full-row">
      &#9660;
    </button>
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

    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.transform-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(254, 109, 12, 0.8);
  border-radius: 50px;
  position: absolute;
  bottom: 2.5px;
  left: 2.5px;
  z-index: 1;
  width: 50px;
  aspect-ratio: 1;

  button {
    &.full-row {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    font-size: 11px;
    color: #fff;

    &:hover {
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
