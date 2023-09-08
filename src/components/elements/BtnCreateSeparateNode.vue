<template>
  <button
    class="btn btn-create-separate-node"
    @click="createSeparateNode() && scrollToRecentlyAdded()"
    title="Создать отдельную подчиненность для узла"
  >
    <font-awesome-icon icon="fa-solid fa-people-roof" />
  </button>
</template>

<script>
import { store } from "@/store";
import { User } from "@/lib/constructors/User";
import { Block } from "@/lib/constructors/Block";
import { scrollToRecentlyAdded } from "@/lib/scrollToRecentlyAdded";

export default {
  name: "BtnCreateSeparateNode",

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

  beforeMount() {
    //here we check if current user is allowed to update scheme
    this.render = store.adminsIds.includes(store.user.id);
  },

  methods: {
    createSeparateNode() {
      const confirmedNewStructure = window.confirm(
        "Создать отдельную подчиненность для текущего узла?"
      );

      if (confirmedNewStructure) {
        const node = this.$props.node;
        store.hasNode(node.id) && store.removeNode(node.id);

        if (node instanceof User)
          store.addNode(
            new User(
              -1,
              node.id,
              node.dep_id,
              node.data.full_name_short,
              node.data.avatar_thumb,
              node.data.position_name,
              node.data.descr,
              0,
              node.tags
            )
          );
        else store.addNode(new Block(-1, node.id, node.data.descr, 0));

        store.toggleShemaStatus(true);
      }

      this.$emit("createSeparateNode", this.createSeparateNode);
      return confirmedNewStructure;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-create-separate-node {
  background: transparent;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: $fs-lg;
}
</style>
