<template>
  <div>
    <!--Modal Start-->
    <div class="block-modal" v-if="!blockIsInQueue">
      <h4>Введите название подгруппы</h4>
      <input type="text" v-model="blockName" />
      <button class="btn btn-create-block" @click="createNewBlock">Создать</button>
    </div>
    <!--Modal End-->
    <div v-else class="new-flowy-block-wrapper">
      <BtnCreateSeparateNode :node="blockSelf" @createSeparateNode="blockIsInQueue = false" />
      <flowy-new-block @drag-stop="handleDragStop" @drag-start="handleDragStart">
        <template v-slot:preview="{}">
          <new-flow-block :id="blockSelf.id" :descr="blockSelf.data.descr" :top="blockSelf.top" />
        </template>

        <template v-slot:node="{}">
          <flow-node :id="blockSelf.id" :descr="blockSelf.data.descr" :top="blockSelf.top" />
        </template>
      </flowy-new-block>
    </div>
  </div>
</template>

<script>
import { Block } from "@/lib/constructors/Block";
import { store } from "@/store";
import BtnCreateSeparateNode from "elements/BtnCreateSeparateNode.vue";

export default {
  name: "BlockAdder",
  data: () => ({
    store,
    blockName: "Новый блок",
    blockIsInQueue: false,
    //!!! Присвоить id последнего юзера в списке, пока стоит временная генерация:
    blockSelf: new Block(),
  }),

  props: {
    onDragStart: {
      type: Function,
      required: true,
    },
    onDragStop: {
      type: Function,
      required: true,
    },
  },

  components: { BtnCreateSeparateNode },

  methods: {
    createNewBlock() {
      this.blockSelf = new Block(
        -1,
        Math.floor(Math.random() * (5000 - 3000) + 3000),
        this.blockName,
        0
      );

      this.blockIsInQueue = true;
      this.blockName = "Новый блок";
    },

    handleDragStart() {
      this.onDragStart();
    },

    handleDragStop() {
      this.onDragStop();
      this.blockIsInQueue = false;
    },
  },
};
</script>

<style lang="scss" scoped>
h4 {
  color: #fff;
  font-weight: 400;
  margin-bottom: 10px;
}

input {
  accent-color: $clr-emerald;
}
.btn {
  margin: 20px auto 10px 2px;
  color: #fff;
  font-size: $fs-mid-reg;
  padding: 4.5px 8px;
  border-radius: 5px;
  transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  width: 150px;

  &-create-block {
    margin: 20px auto;
  }
}

.block-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 300px;
  justify-content: space-evenly;
  align-items: center;
  background: $clr-emerald;
  border-radius: 10px;
  padding: 0px 8.8px;
  margin: 20px 0;

  .btn-close-modal {
    align-self: flex-end;
  }

  .btn-create-block {
    background: $clr-orange;
    color: #fff;
  }
}

.new-flowy-block-wrapper {
  position: relative;

  button {
    margin: unset !important;
    width: auto !important;
    font-size: $fs-mid-head !important;
    position: absolute;
    bottom: 20px;
    right: 35px;
    z-index: 100000;
  }
}
</style>
