<template>
  <button
    class="expander"
    :style="{ ...styling }"
    @click="
      (e) => {
        callback();
        //scrollDown(e);
      }
    "
  >
    {{ !isClosed ? "-" : "+" }}
  </button>
</template>

<script>
export default {
  props: {
    isClosed: {
      type: Boolean,
      required: true,
    },

    callback: {
      type: Function,
      required: true,
    },

    styling: {
      type: Object,
    },
  },
  methods: {
    scrollDown(e) {
      setTimeout(() => {
        e.target.parentElement.parentElement.scrollIntoView({
          behavior: "smooth",
          block: this.isClosed ? "end" : "start",
        });
      }, 60);
    },
  },
};
</script>

<style lang="scss" scoped>
.expander {
  background: $clr-orange;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
}
</style>
