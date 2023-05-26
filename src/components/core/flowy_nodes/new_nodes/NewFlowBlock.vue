<template>
  <div class="flow-block-tab">
    <flowy-drag-handle>
      <div class="flex-none mt-2 mr-2">
        <img src="/demo_assets/grabme.svg" />
      </div>
    </flowy-drag-handle>

    <div class="text-wrapper">
      <p>
        {{ descr }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.user-block {
  width: auto;
}
.bg-white {
  background-color: #ffffff;
}
</style>

<script>
/* eslint-disable no-unused-vars */

export default {
  props: {
    descr: {
      type: String,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.flowy-drag-handle {
  position: absolute;
  right: 5px;
  top: 5px;
}

.flowy-drag-handle :hover {
  cursor: grab;
}

.flow-block-tab {
  display: flex;
  padding: 5px 10px;
  min-height: 200px;
  max-height: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: $clr-emerald;
  margin: 20px 10px;
  border-radius: 30px;
  font-weight: 700;
  z-index: 200;
}
</style>
