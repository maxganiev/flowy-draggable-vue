<template>
  <div
    class="flowy overflow-hidden"
    id="flowy"
    :class="{
      dragging: dragging,
    }"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseleave="onMouseUp"
    @mousemove="onMouseMove"
  >
    <div
      id="flowy-tree"
      :style="{
        transform: `translateX(${this.transBaseX}px) translateY(${this.transBaseY}px) scale(${this.scale})`,
      }"
      ref="elem"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
      @mousemove="onMouseMove"
    >
      <FlowyNode
        v-for="node in parentNodes"
        v-bind="{ ...$props }"
        v-on="{ ...$listeners }"
        :node="node"
        :key="node.id"
        :scale="scale"
        @drag-start="onDragStart($event)"
        @drag-stop="onDragStop($event)"
        @enter-drop="onEnterDrop($event)"
        :before-move="onBeforeMove"
        :before-add="onBeforeAdd"
        :is-dragging="dragging"
      >
      </FlowyNode>
    </div>
  </div>
</template>

<script>
import Mirror from "./Mirror.vue";
import Vue from "vue";
/* eslint-disable no-unused-vars */

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

    scale: {
      type: String,
    },
  },

  data() {
    return {
      elem: null,
      draggingNode: null,
      schemaClicked: false,
      left: 0,
      top: 0,
      transBaseX: 0,
      transBaseY: 0,

      MirrorConstructor: Vue.extend(Mirror),
      flowyNodeMirror: null,
    };
  },

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

  methods: {
    onMouseDown(e) {
      if (
        e.target.getAttribute("data-node") === "flowy" ||
        e.target.getAttribute("data-tree") === "flowy-tree" ||
        e.target.id === "flowy"
      )
        this.dragShema(e);
      if (e.target.parentElement.className === "flowy-drag-handle") this.createFlowyNodeMirror(e);
    },

    onMouseUp(e) {
      this.schemaClicked = false;

      if (document.getElementById("flowy-node-mirror") && e.type !== "mouseleave") {
        this.flowyNodeMirror = null;
        document.getElementById("flowy-node-mirror").remove();
        document.body.removeEventListener("mousemove", this.dragFlowyNodeMirror);
        document.getElementById("flowy").style.cursor = "grab";
      }
    },

    onMouseMove(e) {
      if (!this.schemaClicked) return;

      const rect = this.$refs.elem.getBoundingClientRect();

      //x limits
      // if (rect.left >= 0 && (rect.left / document.body.clientWidth) * 100 >= 90)
      //   this.transBaseX -= 40;
      // if (rect.left < 0 && rect.right <= 240) this.transBaseX += 40;

      //x
      if (this.left > e.clientX) this.transBaseX -= 10;
      if (this.left < e.clientX) this.transBaseX += 10;
      //y
      if (this.top > e.clientY) this.transBaseY -= 10;
      if (this.top < e.clientY) this.transBaseY += 10;

      const scaleFactor = (rect.width / this.$refs.elem.offsetWidth).toFixed(2);

      this.$refs.elem.style.transform = `translateX(${this.transBaseX}px) translateY(${this.transBaseY}px) scale(${scaleFactor})`;
      if (this.left !== e.clientX) this.left = e.clientX;
      this.top = e.clientY;
    },

    dragShema(e) {
      if (
        e.target.getAttribute("data-node") !== "flowy" &&
        e.target.getAttribute("data-tree") !== "flowy-tree" &&
        e.target.id !== "flowy"
      )
        return;
      this.schemaClicked = true;
    },

    createFlowyNodeMirror(e) {
      if (e.target.parentElement.className !== "flowy-drag-handle") return;

      const ref = this.$refs.elem;
      this.flowyNodeMirror = new this.MirrorConstructor({
        propsData: {
          top: e.pageY,
          left: e.clientX - e.target.closest(".flowy-node-wrapper").getBoundingClientRect().width,
          transform: `scale(${(ref.getBoundingClientRect().width / ref.offsetWidth).toFixed(2)})`,
          content: e.target.closest(".flowy-node-wrapper").innerHTML,
        },
      });
      this.flowyNodeMirror.$mount();
      document.body.appendChild(this.flowyNodeMirror.$el);
      document.body.addEventListener("mousemove", this.dragFlowyNodeMirror);
      document.getElementById("flowy").style.cursor = "crosshair";
    },

    dragFlowyNodeMirror(e) {
      const el = this.flowyNodeMirror.$el;
      const rect = el.getBoundingClientRect();

      el.style.top = e.pageY + "px";
      el.style.left = e.clientX - rect.width + "px";
    },

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
    },

    onDragStop(event) {
      this.setNotDragging();
      this.$emit("drag-stop", event);
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
  //background-color: #f0f0f0;
  padding: 5px;
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
