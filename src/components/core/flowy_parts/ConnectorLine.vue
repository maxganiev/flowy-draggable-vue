<template>
  <div
    :style="styling"
    class="flowy-line-block overflow-visible"
    :class="{ 'flowy-line-block--vertical': vertical, '-mt-64px': verticalOffset }"
    ref="svgWrapper"
  >
    <svg
      class="flowy-line"
      preserveaspectratio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- line -->
      <path :d="path" stroke="#C5CCD0" stroke-width="2px" ref="svgLine" />
      <!-- arrow -->
      <path v-if="showArrow" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "ConnectorLine",
  data: () => ({ mounted: false, offset: 0 }),

  props: {
    styling: Object,
    vertical: Boolean,
    verticalOffset: Boolean,
    path: String,
    showArrow: Boolean,
  },

  mounted() {
    setTimeout(() => {
      this.mounted = true;
      this.updateParentOffset();
      !this.withinParent && this.redrawPath();
    }, 100);
  },

  updated() {
    this.$nextTick(() => {
      if (this.mounted) {
        this.updateParentOffset();
        !this.withinParent &&
          setTimeout(() => {
            this.redrawPath();
          }, 100);
      }
    });

    !this.withinParent && this.hideLineWhileDragging();
  },

  computed: {
    parent() {
      if (this.mounted) return this.$refs.svgWrapper.parentElement.parentElement.parentElement;
    },

    withinParent() {
      if (this.mounted) {
        return this.$refs.svgLine.getBoundingClientRect().right <= this.offset.right;
      }
    },
  },

  methods: {
    /**@desc При отрисовке большого кол-ва child нодов возникает баг при рендере линий - они выходят далеко за пределы корневого блока, в котором лежат ноды (возможный баг из-за трансформаций, которые не предусмотрены библиотекой);
     * для устранения получаем актуальный offset корневого блока (div data-tree="flowy-tree", обновляется при каждой перерисовке) и перерисовываем все линии, выходящие за пределы блока, подменяя
     * значения ширины в path на "0"
     */
    redrawPath() {
      const el = this.$refs.svgLine;
      const pathOldWidth = el.getAttribute("d").slice(1).split(" ")[0];
      const newPath = el.getAttribute("d").replaceAll(pathOldWidth, "0");
      el.setAttribute("d", newPath);
    },

    updateParentOffset() {
      this.offset = this.parent.getBoundingClientRect();
    },

    hideLineWhileDragging() {
      this.$refs.svgLine.style.opacity = this.$refs.svgWrapper.classList.contains("isDragged")
        ? 0
        : 1;
    },
  },
};
</script>

<style lang="scss">
.flowy-line-block {
  position: absolute;
  width: 100%;
  overflow: visible;
  pointer-events: none;

  svg {
    width: -webkit-fill-available;
    overflow: visible;
  }

  &--vertical {
    top: 100%;
  }
}
</style>
