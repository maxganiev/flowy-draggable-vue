<template>
  <button
    class="btn btn-create-separate-node"
    @click="cloneNode() && scrollToRecentlyAdded()"
    title="Клонировать узел"
  >
    <font-awesome-icon icon="fa-solid fa-clone" />
  </button>
</template>

<script>
import { store } from "@/store";
import { User } from "@/lib/constructors/User";
import { scrollToRecentlyAdded } from "@/lib/scrollToRecentlyAdded";

export default {
  name: "BtnClondeNode",

  props: {
    node: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    store,
    scrollToRecentlyAdded,
  }),

  methods: {
    cloneNode() {
      const confirmedNewStructure = window.confirm("Клонировать текущий узел?");

      if (confirmedNewStructure) {
        const node = this.node;

        store.addNode(
          new User(
            -1,
            Date.now(),
            node.dep_id,
            node.data.full_name_short,
            node.data.avatar_thumb,
            node.data.position_name,
            node.data.descr,
            0,
            node.tags,
            false,
            true
          )
        );

        store.toggleShemaStatus(true);
      }

      this.$emit("cloneNode", this.cloneNode);
      return confirmedNewStructure;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-create-separate-node {
  background: transparent;
  color: $clr-orange;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: $fs-lg;
}
</style>
