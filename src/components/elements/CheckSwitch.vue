<template>
  <div class="switch-holder" :style="styling.holder">
    <div
      class="switcher"
      :class="{ checked: checked }"
      :style="styling.switcher"
      role="switch"
      @click="onChange"
    >
      <div class="ball" :class="{ checked: checked }" :style="styling.ball"></div>
    </div>
    <label class="form-label" :style="styling.label">{{ labelContent }}</label>
  </div>
</template>

<script>
export default {
  name: "CheckSwitch",
  data: () => ({
    checked: false,
  }),

  props: {
    labelContent: {
      type: String,
      required: true,
    },

    styling: {
      type: Object,
      default() {
        return {
          holder: { display: "inline-block" },
          switcher: { display: "inline-block" },
          ball: { display: "inline-block" },
          label: { display: "inline-block" },
        };
      },
    },
  },
  methods: {
    onChange() {
      this.checked = !this.checked;
      this.$emit("onChange", this.onChange);
    },
  },
};
</script>

<style lang="scss" scoped>
.switcher {
  width: 2rem;
  height: 1rem;
  border-radius: 20px;
  border: $border-main;
  position: relative;
  background: #fff;

  &:hover {
    cursor: pointer;
  }

  &.checked {
    background-color: $clr-emerald;
  }

  .ball {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50px;
    background: gray;
    position: absolute;
    top: 1.5px;
    left: 0%;

    transition: left 0.2s ease-in;
    &.checked {
      background-color: #fff;
      left: 60%;
    }
  }
}
</style>
