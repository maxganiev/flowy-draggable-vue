<template>
  <div class="panel-wrapper">
    <TransformPanel
      v-if="render"
      :onMouseDown="(e) => onBtnPress(node, e)"
      :onMouseUp="onBtnRelease"
    />
    <div
      v-if="node.type === 'user'"
      class="flowy-node-wrapper wrapper-user relative rounded border border-gray-300"
      :data-type="node.type"
      :data-id="node.id"
    >
      <div class="flex flex-row flex-no-wrap justify-between items-center p-4 upper-block">
        <div class="flex flex-row flex-no-wrap justify-start items-center main-info-wrapper">
          <div class="thumb-wrapper">
            <Pic :src="'https://portal.elcomspb.ru/' + avatar_thumb" />
          </div>

          <div class="text-wrapper">
            <p v-if="position_name.length > 50">
              {{ position_name.slice(0, 50) }}
              <span class="span-show-full" @click="showFullPosition = true">...</span>
            </p>
            <p v-else-if="position_name.length <= 50">{{ position_name }}</p>
            <a :href="`${profileUrl}`"> {{ full_name_short }} </a>

            <span
              v-if="showFullPosition && position_name.length > 50"
              class="span-show-full-position"
              >{{ position_name }}

              <span class="span-hide-full" @click="showFullPosition = false">–</span>
            </span>
          </div>
        </div>

        <div class="drag-handle-wrapper" v-if="render">
          <flowy-drag-handle>
            <img :src="`demo_assets/grabme.svg`" />
          </flowy-drag-handle>
        </div>
      </div>

      <Transition name="fade">
        <div v-show="showDescr" class="descr-wrapper">
          <ul v-if="strippedDesc.indexOf('\n') !== -1">
            <li v-for="word in strippedDesc.split('\n')">{{ word }}</li>
          </ul>
          <p v-else>{{ strippedDesc }}</p>
        </div>
      </Transition>
    </div>
    <div
      v-else="node.type === 'block'"
      class="flowy-node-wrapper wrapper-block"
      :data-type="node.type"
      :data-id="node.id"
    >
      <div class="text">
        <p>
          {{ strippedDesc }}
        </p>
      </div>

      <div class="drag-handle-wrapper" v-if="render">
        <flowy-drag-handle>
          <img :src="`demo_assets/grabme.svg`" />
        </flowy-drag-handle>
      </div>
    </div>

    <div class="btn-panel" v-if="showPart">
      <BtnCreateSeparateNode :node="node" />
      <BtnEditNode :node-id="node.id" />
      <BtnRemoveFlowyNode :remove="remove" />
      <BtnExpander
        v-if="node.type === 'user'"
        :callback="() => (showDescr = !showDescr)"
        :isClosed="!showDescr"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import BtnCreateSeparateNode from "elements/BtnCreateSeparateNode.vue";
import BtnEditNode from "elements/BtnEditNode.vue";
import BtnRemoveFlowyNode from "elements/BtnRemoveFlowyNode.vue";
import BtnExpander from "elements/BtnExpander.vue";
import { store } from "@/store.js";
import { User } from "@/lib/constructors/User";
import { Block } from "@/lib/constructors/Block";
import TransformPanel from "modules/TransformPanel.vue";
import { stripHtml } from "@/lib/stripHtml";
import Pic from "elements/Pic.vue";

export default {
  data: () => ({
    store,
    showDescr: false,
    render: false,
    contenteditables: [],
    nodeIsTranslating: false,
    showFullPosition: false,
    avaTemplate: null,
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
      default: "",
    },
    descr: {
      type: String | null,
      required: true,
      default: "",
    },
    profileUrl: {
      type: String,
    },
  },

  components: {
    BtnCreateSeparateNode,
    BtnEditNode,
    BtnRemoveFlowyNode,
    BtnExpander,
    TransformPanel,
    Pic,
  },

  beforeMount() {
    //here we check if current user is allowed to update scheme
    this.render = store.adminsIds.includes(store.user.id);
  },

  computed: {
    showPart() {
      return this.$props.node instanceof User || (this.$props.node instanceof Block && this.render);
    },

    strippedDesc() {
      return this.$props.descr ? stripHtml(this.$props.descr) : "";
    },
  },

  methods: {
    onBtnPress(node, e) {
      this.nodeIsTranslating = true;
      const isUp = e.target.getAttribute("data-direction") === "up";

      if (isUp) this.nodeUp(node, Date.now());
      else this.nodeDown(node, Date.now());

      store.toggleShemaStatus(true);
    },

    onBtnRelease() {
      this.nodeIsTranslating = false;
    },

    nodeUp(node, startTime) {
      if (!this.nodeIsTranslating) return;

      const currentTime = Date.now();
      const dTime = currentTime - startTime;
      const speed = dTime < 1000 ? 10 : 25;

      if (node.top - speed < 0) return;
      node.top -= speed;
      node.parentId !== -1 && this.nodeIsTranslating && this.hideLineOnTranslate();

      setTimeout(() => {
        this.nodeUp(node);
      }, 100);
    },

    nodeDown(node, startTime) {
      if (!this.nodeIsTranslating) return;

      const currentTime = Date.now();
      const dTime = currentTime - startTime;
      const speed = dTime < 1000 ? 10 : 25;

      node.top += speed;
      node.parentId !== -1 && this.nodeIsTranslating && this.hideLineOnTranslate();

      setTimeout(() => {
        this.nodeDown(node, startTime);
      }, 100);
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
.panel-wrapper {
  width: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flowy-node-wrapper {
  width: 320px;
  height: 200px;
  //overflow: scroll;
  cursor: default;
  border-radius: 20px;
  border: none;
}

.wrapper-block {
  background-color: $clr-emerald;
  height: 200px;

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    font-size: 1.6rem;
    color: #fff;
    font-weight: 700;
    text-align: center;
  }
}
.upper-block {
  background-color: $clr-emerald;
  height: 100%;
  padding: 0;
  margin: 0;
  border-radius: 20px;

  .main-info-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .thumb-wrapper {
      // width: 100px;
      // height: 100px;
      height: 100%;
      max-width: 50%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 20px;
      }
    }

    .text-wrapper {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20px;

      %span-tip-shared {
        display: block;
        font-weight: 700;
        font-size: 1.6rem;

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }

      p {
        font-size: 1rem;
        color: #fff;

        .span-show-full {
          @extend %span-tip-shared;
        }
      }

      a {
        font-size: 1rem;
        font-weight: 700;
        color: #fff;
      }

      .span-show-full-position {
        position: absolute;
        top: 120px;
        left: -10px;
        width: 107%;
        height: auto;
        background: $clr-milk;
        opacity: 0.96;
        padding: 10px;
        color: #000;
        border-radius: 20px;
        border: $border-main;

        .span-hide-full {
          @extend %span-tip-shared;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }
}

.descr-wrapper {
  padding: 5px 10px;
  background: $clr-milk;
  font-size: $fs-mid-head;
  border-left: $border-main;
}

.btn-panel {
  height: 165px;
  background-color: $clr-emerald;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 0 10px 10px 0;
  transform: translateX(-1.5px);

  button:hover {
    transform: scale(1.2);
    transition: all 0.4s ease-out;
  }
}
</style>
