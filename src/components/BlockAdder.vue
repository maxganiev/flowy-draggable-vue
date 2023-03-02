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

    <BtnSubmit
      v-if="!blockModalOpened"
      :content="!blockIsInQueue ? 'Добавить подгруппу' : 'Удалить подгруппу'"
      @onSubmit="
        () => {
          if (!blockIsInQueue) {
            openBlockModal();
            createBlock();
          } else {
            removeBlock();
          }
        }
      "
    />

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
      <BtnClose @onClose="closeBlockModal" />
      <!-- <button class="btn-close-modal" @click="closeBlockModal">x</button> -->
      <h4>Введите название подгруппы</h4>
      <input type="text" v-model="blockSelf.data.descr" />
      <button
        class="btn btn-create-block"
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
import BtnClose from "./BtnClose.vue";
import BtnSubmit from "./BtnSubmit.vue";

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

  components: {
    BtnClose,
    BtnSubmit,
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
        store.toggleShemaStatus(true);
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

<style lang="scss" scoped>
h4 {
  color: #fff;
}
.btn {
  margin: 20px auto;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  padding: 4.5px 8px;
  border-radius: 5px;
  transition: all 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);

  &-open-modal {
    &-visible {
      background: #061f8f;
    }

    &-hide {
      display: none;
    }
  }
}

.block-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  max-height: 100%;
  justify-content: space-evenly;
  align-items: center;
  background: rgba(14, 139, 150, 0.8);
  border-radius: 10px;
  padding: 0px 8.8px;
  margin: 20px 0;

  .btn-close-modal {
    align-self: flex-end;
  }

  .btn-create-block {
    background: #fe6b0c;
    color: #fff;
  }
}
</style>
