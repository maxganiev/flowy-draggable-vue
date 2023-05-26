<template>
  <button class="btn-submit" @click="onSubmit">{{ content }}</button>
</template>

<script>
export default {
  name: "BtnSubmit",

  props: {
    content: {
      type: String,
      required: true,
    },
  },

  methods: {
    onSubmit() {
      this.$emit("onSubmit", this.onSubmit);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-submit {
  background: $clr-orange;
  margin: 20px auto;
  color: #fff;
  font-size: $fs-mid-reg;
  padding: 4.5px 8px;
  border-radius: 5px;
  transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
</style>
