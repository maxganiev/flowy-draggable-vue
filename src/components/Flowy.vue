<template>
  <div
    class="flowy overflow-auto"
    :class="{
      dragging: dragging,
    }"
  >
    <div id="flowy-tree" :style="{ transform: `scale(${this.scale})` }" ref="elem">
      <FlowyNode
        v-bind="{ ...$props }"
        v-on="{ ...$listeners }"
        :node="node"
        :key="node.id"
        v-for="node in parentNodes"
        @drag-start="onDragStart($event)"
        @drag-stop="onDragStop($event)"
        @enter-drop="onEnterDrop($event)"
        :before-move="onBeforeMove"
        :before-add="onBeforeAdd"
        :is-dragging="dragging"
      >
      </FlowyNode>
    </div>

    <Scaler v-on:rangeChange="updateScale" />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Scaler from "./Scaler.vue";

export default {
  props: {
    nodes: {
      type: Array,
      required: false,
    },

    beforeMove: {
      type: Function,
      default: () => true,
    },

    beforeAdd: {
      type: Function,
      default: () => true,
    },
  },

  data() {
    return {
      draggingNode: null,
      scale: 1,
    };
  },

  components: { Scaler },

  computed: {
    parentNodes() {
      return this.nodes.filter((node) => node.parentId === -1);
    },

    rows() {
      return [this.parentNodes];
    },

    dragging() {
      return this.draggingNode !== false && this.draggingNode !== null;
    },
  },

  mounted() {
    this.scale = document.getElementById("scaler").value;
  },

  methods: {
    setNotDragging() {
      setTimeout(() => {
        this.draggingNode = null;
      }, 50);
    },

    onBeforeMove(to) {
      return this.beforeMove({ to, from: this.draggingNode });
    },

    onBeforeAdd(to) {
      return this.beforeAdd({ to });
    },

    onDrop() {
      this.setNotDragging();
    },

    onDragStart(event) {
      this.draggingNode = event.node;
      this.$emit("drag-start", event);

      setTimeout(() => {
        this.$refs.elem.style.transform = "unset";
      }, 50);
    },

    onDragStop(event) {
      this.setNotDragging();
      this.$emit("drag-stop", event);

      setTimeout(() => {
        this.$refs.elem.style.transform = `scale(${this.scale})`;
      }, 50);
    },

    onEnterDrop(event) {
      this.$emit("enter-drop", {
        to: event.to,
        from: this.draggingNode,
      });
    },

    getChildren(parentId) {
      return this.nodes.filter((node) => node.parentId === parentId);
    },

    updateScale(e) {
      this.scale = e.target.value;
    },
  },
};
</script>

<style lang="scss">
.draggable-mirror {
  z-index: 100;
  opacity: 0.7;

  svg.flowy-line {
    display: none;
  }
}

.flowy-node {
  transition: all 0.3s;
  @extend .flex, .flex-col, .flex-no-wrap, .items-center, .relative, .overflow-visible;
}

.node-dropzone {
  position: absolute;
  width: 100%;
  height: 128px;
  bottom: -64px;
}

.flowy.dragging .node-dropzone {
  z-index: 9999;
}

.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s, opacity 0.2s;
}

.relative {
  position: relative;
}

.-mt-64px {
  margin-top: -64px;
}

.mt-64px {
  margin-top: 64px;
}

.mr-24px {
  margin-right: 24px;
}

.-mr-24px {
  margin-right: -24px;
}

.justify-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.flex {
  display: flex;

  &-row {
    flex-direction: row;
  }

  &-col {
    flex-direction: column;
  }

  &-no-wrap {
    flex-wrap: nowrap;
  }
}

#flowy-tree {
  @extend .flex, .flex-row, .flex-no-wrap, .relative;
}

.flex .overflow-auto {
  overflow: auto;
}

.overflow-visible {
  overflow: visible;
}

.z-40 {
  z-index: 40;
}

.z-50 {
  z-index: 50;
}
</style>
