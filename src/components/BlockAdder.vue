<template>
  <div>
    <div class="set-block-type-radio-wrapper">
      <span> Тип подгруппы (блока): </span>
      <br />
      <input type="radio" id="radio-set-root-block" value="root" v-model="blockType" />
      <label for="radio-set-root-block"> корневой </label>
      <br />
      <input type="radio" id="radio-set-dependent-block" value="dependent" v-model="blockType" />
      <label for="radio-set-dependent-block"> зависимый </label>
    </div>

    <button
      @click="
        () => {
          if (!blockIsInQueue) {
            openBlockModal();
            createBlock();
          } else {
            removeBlock();
          }
        }
      "
    >
      {{ !blockIsInQueue ? "Добавить" : "Удалить" }} подгруппу
    </button>

    <div v-if="blockIsInQueue">
      <flowy-new-block @drag-stop="handleDragStop">
        <template v-slot:preview="{}">
          <flow-block-tab :id="blockSelf.id" :descr="blockSelf.data.descr" />
        </template>

        <template v-slot:node="{}">
          <flow-node :id="blockSelf.id" :descr="blockSelf.data.descr" />
        </template>
      </flowy-new-block>
    </div>

    <!--Modal Start-->
    <div class="block-modal" v-if="blockModalOpened">
      <button @click="closeBlockModal">x</button>
      <label> Введите название подгруппы </label>
      <input type="text" v-model="blockSelf.data.descr" />
      <button
        @click="
          () => {
            addBlock();
            closeBlockModal();
            blockType === 'root' && scrollToRecentlyAdded();
          }
        "
      >
        Создать
      </button>
    </div>
    <!--Modal End-->
  </div>
</template>

<script>
import { Block } from "../lib/constructors/Block";
import { store } from "../store";

export default {
  name: "BlockAdder",
  data: () => ({
    store,
    blockType: "root",
    blockIsInQueue: false,
    blockModalOpened: false,
    blockSelf: new Block(),
  }),
  props: {
    // dragStart: {
    //   type: Function,
    //   required: true,
    // },
    onDragStop: {
      type: Function,
      required: true,
    },
  },

  methods: {
    createBlock() {
      //!!! Присвоить id последнего юзера в списке, пока стоит временная генерация:
      this.blockSelf = new Block(
        -1,
        Math.floor(Math.random() * (5000 - 3000) + 3000),
        "Привет, я блок!"
      );
    },
    openBlockModal() {
      this.blockModalOpened = true;
    },
    closeBlockModal() {
      this.blockModalOpened = false;
    },
    addBlock() {
      if (this.blockType === "root") {
        store.addNode(this.blockSelf);
      } else {
        this.blockIsInQueue = true;
      }
    },
    removeBlock() {
      this.blockIsInQueue = false;
    },
    scrollToRecentlyAdded() {
      setTimeout(() => {
        const flowyHTMLCollection = document.getElementsByClassName("flowy-node");
        const recentlyAddedFlowyElem = flowyHTMLCollection[flowyHTMLCollection.length - 1];

        recentlyAddedFlowyElem.firstElementChild.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start",
        });
      }, 100);
    },
    handleDragStop() {
      this.onDragStop();
      this.blockIsInQueue = false;
    },
  },
};
</script>
