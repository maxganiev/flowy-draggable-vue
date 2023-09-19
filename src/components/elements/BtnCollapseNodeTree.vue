<template>
  <button class="btn-swipe-tree-visibility" @click.self="(e) => onClick(node, e)" :style="styling">
    <font-awesome-icon v-if="!collapsed" icon="fa-solid fa-chevron-up" />
    <font-awesome-icon v-else icon="fa-solid fa-chevron-down" />
  </button>
</template>

<script>
import { store } from "@/store.js";

export default {
  name: "BtnCollapseNodeTree",
  props: {
    node: {
      type: Object,
      //required: true,
    },

    styling: {
      type: Object,
    },
  },
  data: () => ({
    store,
    collapsed: false,
  }),

  methods: {
    onClick(node, e) {
      this.collapsed = !this.collapsed;
      const closest = e.target.closest(".draggable-item");
      const domTree = closest.nextElementSibling;
      domTree.style.display = this.collapsed ? "none" : "flex";

      const coverId = `lineheader-${node.id}`;

      if (this.collapsed)
        closest.insertAdjacentHTML("beforeend", `<div id="${coverId}" class="line-cover"></div>`);
      else document.getElementById(coverId).remove();

      //обновляем реактивное значение, чтобы вызвать перерисовку линий:
      store.schemaClicked = true;

      this.$emit("onClick", this.onClick);

      setTimeout(() => {
        store.schemaClicked = false;
      }, 150);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-swipe-tree-visibility {
  background: transparent;
  color: #fff;
  font-weight: 700;
  width: 15px;
  height: 15px;
  font-size: 1rem;

  &:focus,
  &:active {
    box-shadow: none;
  }
}

.fa-chevron-up,
.fa-chevron-down {
  pointer-events: none;
}
</style>
