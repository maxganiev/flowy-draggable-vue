<template>
  <div class="grid" ref="gridWrapper" v-on="{ ...$listeners }" id="grid-schema">
    <div class="grid-content" ref="gridContent"></div>
  </div>
</template>

<script>
/**
 * dims:
 * H: 200px/2
 * W: 320px
 */

class GridElem {
  constructor(ref, width, height) {
    this.ref = ref;
    this.width = width;
    this.height = height;
  }

  updateDims() {
    this.width = this.ref.getBoundingClientRect().width;
    this.height = this.ref.getBoundingClientRect().height;
  }
}

class Cell {
  constructor(parentElem) {
    this.elem = document.createElement("div");
    this.elem.style.width = "100%";
    this.elem.style.height = "100px";
    parentElem.appendChild(this.elem);
  }
}

class Row extends Cell {
  constructor(parentElem) {
    super(parentElem);
    this.elem.style.width = "100%";
    this.elem.style.height = "100px";
    this.elem.style.display = "flex";
  }
}

class Column extends Cell {
  constructor(parentElem) {
    super(parentElem);
    this.elem.style.width = "320px";
    this.elem.style.height = "100%";
    this.elem.style.border = "0.5px #bd4028 solid";
    this.elem.classList.add("grid-cell");
  }
}

export default {
  name: "Grid",
  data: () => ({
    gridWrapper: new GridElem(null, 0, 0),
    gridContent: new GridElem(null, 0, 0),
    numberOfColumns: 0,
    numberOfRows: 0,
    rows: [],
    isResizing: false,
  }),

  mounted() {
    this.gridWrapper.ref = this.$refs.gridWrapper;
    this.gridContent.ref = this.$refs.gridContent;
    this.clearCells();

    this.calcGrid();
    this.drawGrid();

    window.addEventListener("resize", this.hadleScreenResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.hadleScreenResize);
  },

  methods: {
    getNumberOfRows() {
      this.numberOfRows = this.gridWrapper.height / 100;
    },

    getNumberOfColumns() {
      this.numberOfColumns = this.gridWrapper.width / 320;
    },

    addRows() {
      if (this.gridContent.ref.children.length >= this.numberOfRows) return;
      this.rows.push(new Row(this.gridContent.ref));

      setTimeout(() => {
        this.addRows();
      }, 10);
    },

    addColumns() {
      if (this.rows.every((row) => row.elem.children.length >= this.numberOfColumns)) return;
      this.rows.forEach((row) => new Column(row.elem));

      setTimeout(() => {
        this.addColumns();
      }, 10);
    },

    clearCells() {
      this.rows = [];

      while (this.gridContent.ref.firstElementChild) {
        this.gridContent.ref.firstElementChild.remove();
      }
    },

    calcGrid() {
      this.gridWrapper.updateDims();
      this.gridContent.updateDims();

      this.getNumberOfRows();
      this.getNumberOfColumns();
    },

    drawGrid() {
      this.addRows();
      this.addColumns();
    },

    /**@desc Перерисовываем сетку только тогда, когда ресайз окончен */
    async hadleScreenResize() {
      const currWindowHeight = window.innerHeight;
      const currWindowWidth = window.innerWidth;

      this.isResizing = await new Promise((resolve) =>
        setTimeout(() => {
          resolve(
            !(currWindowWidth === window.innerWidth && currWindowHeight === window.innerHeight)
          );
        }, 100)
      );

      if (this.isResizing) return;
      this.clearCells();
      this.calcGrid();
      this.drawGrid();
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 40px);

  .grid-content {
    width: max-content;
    height: max-content;
  }
}
</style>
