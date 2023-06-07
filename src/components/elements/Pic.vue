<template>
  <img :src="!template ? src : template" @error="onImgLoadErr" />
</template>

<script>
export default {
  name: "Pic",
  data: () => ({ template: null }),

  props: {
    src: {
      type: String,
      required: true,
    },
  },

  methods: {
    onImgLoadErr(e) {
      this.template = "/user-regular.svg";
      e.target.style.width = "80px";
      e.target.style.margin = "10px 20px";
    },
  },
};
</script>
