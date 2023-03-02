<template>
  <div v-if="show" class="alert" :class="alertType" v-html="HTMLContent"></div>
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
        return ["success", "warning", "danger"].includes(value);
      },
    },
  },
};
</script>

<style scoped>
.alert {
  z-index: 10;
  position: absolute;
  padding: 10px 20px;
  color: #fff;
  border-radius: 10px;
}

.success {
  background-color: #0e8a96;
}

.warning {
  background-color: #061f8f;
}

.danger {
  background-color: #bd4028;
}
</style>
