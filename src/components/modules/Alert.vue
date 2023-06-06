<template>
  <div class="alert" :class="[alertType, { show: show }]" v-html="HTMLContent"></div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true,
    },

    HTMLContent: {
      type: String,
      required: true,
    },

    alertType: {
      type: String,
      required: true,
      validator(value) {
        return ["success", "warning", "danger", "default"].includes(value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  z-index: 200;
  position: fixed;
  padding: 10px 20px;
  color: #fff;
  width: 100%;
  min-height: 8vh;
  max-height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-100%);
  transition: all 0.6s ease-in;

  &.show {
    transform: translateY(0%);
    transition: all 0.6s ease-in;
  }
}

.success {
  background-color: $clr-emerald;
}

.warning {
  background-color: #061f8f;
}

.danger {
  background-color: $clr-danger;
}

.default {
  background-color: transparent;
}
</style>
