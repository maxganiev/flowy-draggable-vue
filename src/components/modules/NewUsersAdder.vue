<template>
  <div class="div-user-items" @mousedown="onMousedown">
    <flowy-new-block
      v-for="item in users"
      :key="item.id"
      @drag-start="onDragStartNewBlock"
      @drag-stop="onDragStopNewBlock"
    >
      <template v-slot:preview="{}">
        <new-flow-node
          :node="item"
          :id="item.id"
          :dep_id="item.dep_id"
          type="user"
          :full_name_short="item.data.full_name_short"
          :avatar_thumb="item.data.avatar_thumb"
          :position_name="item.data.position_name"
          :profileUrl="item.data.profileUrl"
          :descr="item.data.descr"
          :top="item.top"
          :tags="item.tags"
          :useDottedConnectorLine="false"
        />
      </template>

      <template v-slot:node="{}">
        <flow-node
          :node="item"
          :id="item.id"
          :dep_id="item.dep_id"
          type="user"
          :full_name_short="item.data.full_name_short"
          :avatar_thumb="item.data.avatar_thumb"
          :position_name="item.data.position_name"
          :profileUrl="item.data.profileUrl"
          :descr="item.data.descr"
          :top="item.top"
          :tags="item.tags"
          :useDottedConnectorLine="false"
        />
      </template>
    </flowy-new-block>
  </div>
</template>

<script>
export default {
  name: "NewUsersAdder",
  props: {
    users: {
      type: Array,
      required: true,
    },

    onDragStartNewBlock: {
      type: Function,
      required: true,
    },

    onDragStopNewBlock: {
      type: Function,
      required: true,
    },

    onMousedown: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.div-user-items {
  .flowy-block {
    margin: 10px 0;
  }
}
</style>
