<template>
  <div
    class="flowy overflow-hidden"
    id="flowy"
    :class="{
      dragging: dragging,
    }"
    ref="flowyContainer"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="
      (e) => {
        if (!this.flowyNodeMirror) onMouseMove(e);
        else dragFlowyNodeMirror(e);
      }
    "
  >
    <Grid @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove" v-if="showGrid" />

    <div
      id="flowy-tree"
      :style="{
        transform: `translateX(${store.schemaTransVals.x}px) translateY(${store.schemaTransVals.y}px) scale(${store.schemaTransVals.scale})`,
      }"
      ref="elem"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    >
      <FlowyNode
        v-for="node in parentNodes"
        v-bind="{ ...$props }"
        v-on="{ ...$listeners }"
        :node="node"
        :key="node.id"
        :scale="store.schemaTransVals.scale"
        @drag-start="onDragStart($event)"
        @drag-stop="onDragStop($event)"
        @enter-drop="onEnterDrop($event)"
        :before-move="onBeforeMove"
        :before-add="onBeforeAdd"
        :is-dragging="dragging"
        :schema-is-dragged="store.schemaClicked"
      >
      </FlowyNode>
    </div>
  </div>
</template>

<script>
import Mirror from "./flowy_components/Mirror.vue";
import Vue from "vue";
import Grid from "modules/Grid.vue";
import { store } from "@/store.js";
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

    showGrid: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      elem: null,
      draggingNode: null,
      left: 0,
      top: 0,
      deltaX: 0,
      deltaY: 0,
      store,
      MirrorConstructor: Vue.extend(Mirror),
      flowyNodeMirror: null,
      int: null,
    };
  },

  components: { Grid },

  mounted() {
    this.translateIntoView();
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
    translateIntoView() {
      const firstFlowyNodeRect = document
        .querySelector('[data-node="flowy"]')
        .getBoundingClientRect();

      store.schemaTransVals.x = -firstFlowyNodeRect.width / 2.5;
      store.schemaTransVals.y = -firstFlowyNodeRect.top * 0.9;
    },

    onMouseDown(e) {
      if (
        e.target.getAttribute("data-node") === "flowy" ||
        e.target.getAttribute("data-tree") === "flowy-tree" ||
        e.target.id === "flowy" ||
        e.target.id === "flowy-tree" ||
        e.target.id === "grid-schema" ||
        e.target.classList.contains("grid-cell")
      )
        this.dragShema(e);
      if (e.target.parentElement.className === "flowy-drag-handle" && !this.flowyNodeMirror)
        this.createFlowyNodeMirror(e);
    },

    onMouseUp(e) {
      store.toggleShemaClicked(false);

      if (document.getElementById("flowy-node-mirror") && e.type !== "mouseleave") {
        this.flowyNodeMirror = null;
        document.getElementById("flowy-node-mirror").remove();
        document.getElementById("flowy").style.cursor = "grab";

        clearInterval(this.int);
      }
    },

    onMouseMove(e) {
      if (!store.schemaClicked) return;

      const rect = this.$refs.elem.getBoundingClientRect();
      const dragStep = 30;
      //x
      this.deltaX = Math.abs(this.left - e.clientX);
      if (this.deltaX > 2.6) {
        if (this.left > e.clientX) store.schemaTransVals.x -= dragStep;
        if (this.left < e.clientX) store.schemaTransVals.x += dragStep;
      }
      //y
      this.deltaY = Math.abs(this.top - e.clientY);
      if (this.deltaY > 2.6) {
        if (this.top > e.clientY) store.schemaTransVals.y -= dragStep;
        if (this.top < e.clientY) store.schemaTransVals.y += dragStep;
      }

      const scaleFactor = (rect.width / this.$refs.elem.offsetWidth).toFixed(2);

      this.$refs.elem.style.transform = `translateX(${store.schemaTransVals.x}px) translateY(${store.schemaTransVals.y}px) scale(${scaleFactor})`;
      if (this.left !== e.clientX) this.left = e.clientX;
      this.top = e.clientY;
    },

    dragShema(e) {
      if (
        e.target.getAttribute("data-node") !== "flowy" &&
        e.target.getAttribute("data-tree") !== "flowy-tree" &&
        e.target.id !== "flowy" &&
        e.target.id !== "flowy-tree" &&
        e.target.id !== "grid-schema" &&
        !e.target.classList.contains("grid-cell")
      )
        return;
      store.toggleShemaClicked(true);
    },

    createFlowyNodeMirror(e) {
      if (e.target.parentElement.className !== "flowy-drag-handle") return;

      document.getElementById("flowy").style.cursor = "crosshair";

      this.flowyNodeMirror = new this.MirrorConstructor({
        propsData: {
          top: e.pageX,
          left: e.pageY,
          transform: `scale(${document.getElementById("scaler").value})`,
          content: e.target.closest(".flowy-node-wrapper").innerHTML,
        },
      });
      this.flowyNodeMirror.$mount();
      this.$refs.flowyContainer.appendChild(this.flowyNodeMirror.$el);

      this.int = setInterval(() => {
        this.scrollPageWhileDraggingMirror(this.flowyNodeMirror.$el.getBoundingClientRect());
      }, 100);
    },

    dragFlowyNodeMirror(e) {
      let x, y;
      if (e.target.id === "flowy" && e.target.id === "flowy-node-mirror") {
        x = e.offsetX;
        y = e.offsetY;
      } else {
        x = e.pageX;
        y = e.pageY;
      }

      this.flowyNodeMirror._props.top = y;
      this.flowyNodeMirror._props.left = x;
    },

    scrollPageWhileDraggingMirror(rect) {
      //X
      const mirrorScrolledPageByX = rect.x / this.$refs.flowyContainer.clientWidth;
      if (mirrorScrolledPageByX >= 0.8) store.schemaTransVals.x -= 40;
      else if (mirrorScrolledPageByX <= 0.1) store.schemaTransVals.x += 40;

      //Y
      const mirrorScrolledPageByY = rect.y / this.$refs.flowyContainer.clientHeight;
      if (mirrorScrolledPageByY >= 0.65) store.schemaTransVals.y -= 40;
      else if (mirrorScrolledPageByY <= 0.1) store.schemaTransVals.y += 40;
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

      // const draggedElemRect = event.draggedElem.getBoundingClientRect();
      // console.log(draggedElemRect.x / this.$refs.flowyContainer.clientWidth);
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
  bottom: -32px;
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
  // transition: transform 0.1s ease-out;
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
