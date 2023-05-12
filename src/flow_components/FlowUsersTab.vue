<template>
  <div class="user-block p-2 bg-white mb-4 rounded border border-gray-300">
    <div class="flex flex-row flex-no-wrap ml-2">
      <div class="flex flex-row flex-no-wrap justify-start items-center main-info-wrapper">
        <flowy-drag-handle>
          <div class="flex-none mt-2 mr-2">
            <img src="/demo_assets/grabme.svg" />
          </div>
        </flowy-drag-handle>

        <div class="thumb-wrapper">
          <img :src="'https://portal.elcomspb.ru/' + avatar_thumb" />
        </div>

        <div class="text-wrapper">
          <p>
            {{ position_name }}
          </p>
          <a :href="`${profileUrl}`"> {{ full_name_short }} </a>
        </div>
      </div>
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
    avatar_thumb: {
      type: String,
    },
    id: {
      type: Number,
      required: true,
    },
    dep_id: {
      type: Number,
      required: true,
    },
    full_name_short: {
      type: String,
    },
    position_name: {
      type: String,
    },

    profileUrl: {
      type: String,
    },

    descr: {
      type: String | null,
      required: true,
    },

    top: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  destroyed() {},
  methods: {},
};
</script>

<style scoped>
.flowy-drag-handle {
  position: absolute;
  right: 5px;
  top: 5px;
}

.flowy-drag-handle :hover {
  cursor: grab;
}
</style>
