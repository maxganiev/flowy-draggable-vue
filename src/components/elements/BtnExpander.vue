<template>
  <button
    class="expander"
    :class="generatedClass"
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

    node: {
      type: Object,
      required: true,
    },
  },

  computed: {
    generatedClass() {
      return "btn-expander-bg-" + this.node.cssClassName.split("-").slice(3).join("-");
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
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
}
</style>
