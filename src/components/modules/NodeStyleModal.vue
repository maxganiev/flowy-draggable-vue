<template>
  <div class="node-style-modal">
    <slot />
    <div class="pallete">
      <div class="header">
        <h4>Выберите стиль блока</h4>
      </div>
      <div
        v-for="(p, index) in nodePallete"
        :key="index"
        class="cell"
        :class="{ selected: node.cssClassName === p }"
        @click="node.cssClassName = p"
      >
        <div class="pal" :class="p"></div>
        <div v-if="node.type === 'user'" class="btn-rounded" :class="btnPallete[index]"></div>
      </div>
    </div>

    <div class="pallete">
      <div class="header"><h4>Выберите тип соединительной линии</h4></div>
      <div class="text-center">
        <input type="radio" value="1" v-model="connectorLineType" @change="setNodenodeStyleModal" />
        <span class="svg-wrapper">
          Сплошная
          <svg height="40" width="120">
            <line x1="0" y1="0" x2="120" y2="0" style="stroke: #00606f; stroke-width: 2" />
            Sorry, your browser does not support inline SVG.
          </svg></span
        >
      </div>

      <div class="text-center">
        <input type="radio" value="2" v-model="connectorLineType" @change="setNodenodeStyleModal" />
        <span class="svg-wrapper"
          >Пунктирная
          <svg height="40" width="120">
            <line
              stroke-dasharray="4"
              x1="0"
              y1="0"
              x2="120"
              y2="0"
              style="stroke: #00606f; stroke-width: 2"
            />
            Sorry, your browser does not support inline SVG.
          </svg></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NodeStyleModal",
  props: {
    node: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    connectorLineType: undefined,
  }),

  created() {
    this.connectorLineType = this.node.useDottedConnectorLine ? 2 : 1;
  },

  computed: {
    nodePallete() {
      return Array.from(["default", 1, 2, 3], (n) => `block-body-${this.node.type}-set-${n}`);
    },

    btnPallete() {
      return Array.from(["default", 1, 2, 3], (n) => `btn-expander-bg-set-${n}`);
    },
  },

  methods: {
    setNodenodeStyleModal() {
      this.node.useDottedConnectorLine = this.connectorLineType == 2;
    },
  },
};
</script>

<style lang="scss" scoped>
.node-style-modal {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  background: #fff;
  padding: 10px;
  opacity: 0.97;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .pallete {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1.2rem;
    column-gap: 1.2rem;

    .header {
      grid-column-start: 1;
      grid-column-end: 3;
      text-align: center;
      margin-bottom: 50px;

      h4 {
        font-size: $fs-mid-head;
      }
    }

    .cell {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 10px;
      border-radius: 10px;

      &:hover {
        cursor: pointer;
      }

      &.selected {
        border: 0.5px $clr-primary solid;
      }

      .pal {
        width: 60%;
        height: 80%;
        min-width: 40px;
        min-height: 60px;
      }

      .btn-rounded {
        width: 50px;
        border-radius: 30px;
        height: 50px;
      }
    }

    .text-center {
      input {
        margin-right: 10px;
      }

      .svg-wrapper > svg {
        position: relative;
        left: 70px;
        top: 10px;
      }
    }
  }
}
</style>
