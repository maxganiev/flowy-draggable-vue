<template>
  <div
    v-if="node.type === 'user'"
    class="flowy-node-wrapper wrapper-user relative rounded border border-gray-300"
    :data-type="node.type"
    :data-id="node.id"
    :data-node="JSON.stringify(node)"
    @dblclick="onDblclick"
  >
    <div class="flex flex-row flex-no-wrap justify-between items-center p-4 upper-block">
      <div class="flex flex-row flex-no-wrap justify-start items-center main-info-wrapper">
        <div class="thumb-wrapper">
          <img :src="'https://portal.elcomspb.ru/' + avatar_thumb" />
        </div>

        <div class="text-wrapper">
          <p
            :contenteditable="render"
            v-on:focusout="(e) => updatePositionName(node, e.target.textContent)"
          >
            {{ position_name }}
          </p>
          <a :href="`${profileUrl}`"> {{ full_name_short }} </a>
        </div>
      </div>

      <div class="drag-handle-wrapper" v-if="render">
        <flowy-drag-handle>
          <img :src="`demo_assets/grabme.svg`" />
        </flowy-drag-handle>
      </div>

      <TransformPanel @onNodeUp="nodeUp.call(this, node)" @onNodeDown="nodeDown.call(this, node)" />

      <BtnRemoveFlowyNode :remove="remove" />
      <BtnExpander :callback="() => (showDescr = !showDescr)" :isClosed="!showDescr" />
    </div>

    <Transition name="fade">
      <div
        v-show="showDescr"
        class="descr-wrapper"
        :contenteditable="render"
        v-html="descr"
        v-on:focusout="(e) => updateDescr(node, e.target.textContent)"
      ></div>
    </Transition>
  </div>
  <div
    v-else="node.type === 'block'"
    class="flowy-node-wrapper wrapper-block"
    :data-type="node.type"
    :data-id="node.id"
    :data-node="JSON.stringify(node)"
    @dblclick="onDblclick"
  >
    <div
      :contenteditable="render"
      class="text"
      v-html="descr"
      v-on:focusout="(e) => updateDescr(node, e.target.textContent)"
    ></div>

    <div class="drag-handle-wrapper" v-if="render">
      <flowy-drag-handle>
        <img :src="`demo_assets/grabme.svg`" />
      </flowy-drag-handle>
    </div>

    <TransformPanel @onNodeUp="nodeUp.call(this, node)" @onNodeDown="nodeDown.call(this, node)" />
    <BtnRemoveFlowyNode :remove="remove" />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import BtnRemoveFlowyNode from "../components/BtnRemoveFlowyNode.vue";
import BtnExpander from "../components/BtnExpander.vue";
import { store } from "../store";
import { User } from "../lib/constructors/User";
import { Block } from "../lib/constructors/Block";
import TransformPanel from "../components/TransformPanel.vue";

export default {
  data: () => ({
    store,
    showDescr: false,
    render: false,
    contenteditables: [],
  }),
  props: {
    width: {
      default: 300,
    },
    height: {
      default: 250,
    },
    remove: {
      type: Function,
      required: true,
    },
    node: {
      type: Object,
      required: true,
    },
    avatar_thumb: {
      type: String,
    },
    full_name_short: {
      type: String,
    },
    position_name: {
      type: String,
    },
    descr: {
      type: String | null,
      required: true,
    },
    profileUrl: {
      type: String,
    },
  },

  components: { BtnRemoveFlowyNode, BtnExpander, TransformPanel },
  beforeMount() {
    //here we check if current user is allowed to update scheme
    this.render = store.adminsIds.includes(store.user.id);
  },

  methods: {
    onDblclick(e) {
      const confirmedNewStructure = window.confirm(
        "Создать отдельную подчиненность для текущего блока?"
      );

      const rootEl = e.target.closest(".flowy-node-wrapper");

      if (confirmedNewStructure) {
        store.removeNode(Number(rootEl.getAttribute("data-id")));

        const node = JSON.parse(rootEl.getAttribute("data-node"));

        if (rootEl.getAttribute("data-type") === "user")
          store.addNode(
            new User(
              -1,
              node.id,
              node.dep_id,
              node.data.full_name_short,
              node.data.avatar_thumb,
              node.data.position_name,
              node.data.descr,
              0
            )
          );
        else store.addNode(new Block(-1, node.id, node.data.descr, 0));
      }
    },

    updatePositionName(node, value) {
      node.data.position_name = value;
      store.toggleShemaStatus(true);
    },

    updateDescr(node, value) {
      console.log(node);
      node.data.descr = value;
      store.toggleShemaStatus(true);
    },

    nodeUp(node) {
      if (node.top - 100 < 0) return;
      node.top -= 100;
      node.parentId !== -1 && this.hideLineOnTranslate();
    },

    nodeDown(node) {
      node.top += 100;
      node.parentId !== -1 && this.hideLineOnTranslate();
    },

    hideLineOnTranslate() {
      const line = [...this.$el.closest(".flowy-block").children].find((child) =>
        child.classList.contains("flowy-line-block")
      );

      if (!line) throw new Error("Check class spelling!");

      line.style.opacity = "0";
      setTimeout(() => {
        line.style.opacity = "1";
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.flowy-node-wrapper {
  width: 320px;
  height: 200px;
  border-radius: 20px;
  overflow: scroll;
  cursor: default;
}

.wrapper-block {
  background-color: #0e8a96;
  height: 200px;

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    font-size: 1.6rem;
    color: #fff;
    font-weight: 700;
  }
}
.upper-block {
  background-color: #0e8a96;
  height: 100%;

  .main-info-wrapper {
    position: relative;

    .thumb-wrapper {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
      }
    }

    .text-wrapper {
      text-align: right;
      flex: 0.5;
      margin: 0 10px;
      line-height: 1.2rem;

      p {
        font-size: 0.85rem;
        color: #fff;
      }

      a {
        font-size: 0.9rem;
        font-weight: 700;
        color: #fff;
      }
    }
  }
}

.descr-wrapper {
  padding: 5px 10px;
  line-height: 1.2rem;
  background: #f0f0f0;
  font-size: 0.9rem;
  text-align: right;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
