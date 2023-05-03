<template>
  <div class="h-screen w-screen bg-gray-200 flex flex-col flex-no-wrap overflow-none">
    <Spinner :loading="store.loading" />

    <div class="panel" ref="panel">
      <div class="div-schema-update-warning" v-if="store.shemaIsUpdated && showSchemaUpdateWarning">
        <BtnClose @onClose="() => (showSchemaUpdateWarning = false)" />
        <span> Схема обновлена!</span>
        <ConfirmationModal
          HTMLContent="<strong> Вы уверены, что хотите обновить схему? </strong>"
        />
      </div>
      <Scaler @rangeChange="updateScale" />
    </div>

    <div class="flex-grow flex flex-row flex-no-wrap overflow-hidden">
      <div
        v-if="renderUsersTab"
        class="z-40 pl-6 pt-6 bg-white border-r border-grey-400 users-tab-wrapper"
        :style="{ transform: usersTabCollapsed ? 'translateX(-100%)' : 'translateX(0%)' }"
        ref="usersTab"
      >
        <div class="addtypes-radio-wrapper">
          <h4>Добавить:</h4>
          <br />
          <input type="radio" id="radio-add-user" value="user" v-model="addType" />
          <label for="radio-add-user"> пользователя </label>
          <br />
          <input type="radio" id="radio-add-block" value="block" v-model="addType" />
          <label for="radio-add-block"> подгруппу (блок) </label>
        </div>

        <div class="side z-50" v-if="addType === 'user'">
          <SearchUsers @onSearch="(searchStart) => toggleSearch(searchStart)" />

          <div
            class="div-user-items"
            v-if="store.users.length && searchStart"
            @mousedown="onMousedown"
          >
            <flowy-new-block
              v-for="item in store.users"
              :key="item.id"
              @drag-start="onDragStartNewBlock"
              @drag-stop="onDragStopNewBlock"
            >
              <template v-slot:preview="{}">
                <flow-users-tab
                  :id="item.id"
                  :dep_id="item.dep_id"
                  type="user"
                  :full_name_short="item.data.full_name_short"
                  :avatar_thumb="item.data.avatar_thumb"
                  :position_name="item.data.position_name"
                  :profileUrl="item.data.profileUrl"
                  :descr="item.data.descr"
                />
              </template>

              <template v-slot:node="{}">
                <flow-node
                  :id="item.id"
                  :dep_id="item.dep_id"
                  type="user"
                  :full_name_short="item.data.full_name_short"
                  :avatar_thumb="item.data.avatar_thumb"
                  :position_name="item.data.position_name"
                  :profileUrl="item.data.profileUrl"
                  :descr="item.data.descr"
                />
              </template>
            </flowy-new-block>
          </div>
          <h4 style="margin: 20px" v-else-if="store.users.length === 0 && searchStart">
            Пользователи не найдены.
          </h4>
        </div>
        <div class="side z-50" @mousedown="onMousedown" v-else>
          <BlockAdder :on-drag-start="onDragStartNewBlock" :on-drag-stop="onDragStopNewBlock" />
        </div>
      </div>

      <button v-if="renderUsersTab" class="btn-swipe-collapse" v-on:click="swipeUsersTabCollapse">
        {{ !usersTabCollapsed ? "-" : "+" }}
      </button>

      <div class="flex-grow overflow-auto scheme-wrapper" id="schemeWrapper" ref="schemeWrapper">
        <flowy
          v-if="store.nodes.length > 0"
          class="h-full w-full p-6"
          :nodes="store.nodes"
          :scale="schemaScale"
          @drag-start="onDragStart"
          @add="add"
          @move="move"
          @remove="remove"
          :beforeAdd="beforeAdd"
          :beforeMove="beforeMove"
          :onEnterDragFn="onEnter"
        ></flowy>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable no-unused-vars */
import { getUsersScheme } from "./demo_data/getUsersScheme";
import { getCurrentUser } from "./demo_data/getCurrentUser";
import { store } from "./store";
import SearchUsers from "./components/SearchUsers.vue";
import { User } from "./lib/constructors/User";
import BlockAdder from "./components/BlockAdder.vue";
import { Block } from "./lib/constructors/Block";
import Spinner from "./components/Spinner.vue";
import Scaler from "./components/Scaler.vue";
import ConfirmationModal from "./components/ConfirmationModal.vue";
import BtnClose from "./components/BtnClose.vue";
import Vue from "vue";
import Mirror from "./components/Mirror.vue";
import { calcSvgLinesZoom } from "./lib/calcSvgLinesZoom";

export default {
  name: "app",

  data: () => ({
    store,
    users: [],
    holder: [],
    dragging: false,
    newDraggingBlock: null,
    usersTabCollapsed: false,
    addType: "user",
    renderUsersTab: false,
    usersTab: null,
    schemeWrapper: null,
    searchStart: false,
    schemaScale: "0.85",
    panel: null,
    showSchemaUpdateWarning: true,
    ref: null,

    MirrorConstructor: Vue.extend(Mirror),
    flowyNodeMirror: null,
  }),

  components: { SearchUsers, BlockAdder, Spinner, Scaler, ConfirmationModal, BtnClose },

  async created() {
    store.toggleLoading();
    await getCurrentUser().then(async (res) => {
      store.getUser(res);
      //here we check if current user is allowed to update scheme
      this.renderUsersTab = store.adminsIds.includes(store.user.id);
      //this.nodes = await getUsersScheme();
      store.getNodes(await getUsersScheme());
      console.log(store.nodes);
    });
    store.toggleLoading();
  },

  methods: {
    toggleSearch(searchStart) {
      this.searchStart = searchStart;
    },
    swipeUsersTabCollapse() {
      this.usersTabCollapsed = !this.usersTabCollapsed;

      setTimeout(() => {
        this.$refs.usersTab.style.display = this.usersTabCollapsed ? "none" : "block";
      }, 200);
    },
    updateScale(target) {
      this.schemaScale = target.value;
    },
    onMousedown(e) {
      if (e.target.parentElement.parentElement.className === "flowy-drag-handle")
        this.createFlowyNodeMirror(e);
    },

    createFlowyNodeMirror(e) {
      if (e.target.parentElement.parentElement.className !== "flowy-drag-handle") return;

      const closestEl =
        this.addType === "user"
          ? e.target.closest(".user-block")
          : e.target.closest(".flow-block-tab");

      this.flowyNodeMirror = new this.MirrorConstructor({
        propsData: {
          top: e.clientY,
          left: e.clientX - closestEl.getBoundingClientRect().width,
          transform: "1",
          content: closestEl.innerHTML,
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

      el.style.top = e.clientY + "px";
      el.style.left = e.clientX - rect.width + "px";
    },

    onDragStartNewBlock(event) {
      console.log("onDragStartNewBlock", event);
      this.newDraggingBlock = event;
    },
    onDragStopNewBlock(event) {
      console.log("onDragStopNewBlock", event);
      this.newDraggingBlock = null;

      if (this.flowyNodeMirror) {
        this.flowyNodeMirror = null;
        document.getElementById("flowy-node-mirror").remove();
        document.body.removeEventListener("mousemove", this.dragFlowyNodeMirror);
        document.getElementById("flowy").style.cursor = "grab";
      }
    },
    onDropBlock(_event) {},
    beforeAdd(event) {
      console.log("before add", event);
      store.removeAddedUser(event.to.data.id);

      setTimeout(() => {
        //updating SVG lines zoom:
        calcSvgLinesZoom("flowy-line", document.getElementById("scaler").value);
      }, 150);
      return true;
    },
    afterAdd() {},
    onEnterDrop(event) {
      console.log("entered drop");
      return true;
    },
    beforeMove({ to, from }) {
      console.log(to, from);
      if (from && from.id === "1") {
        return false;
      }
      return true;
    },
    onEnter() {},
    addNode(_event) {
      //this.nodes.push(_event.node);
      store.addNode(_event.node);
      store.toggleShemaStatus(true);
    },
    remove(event) {
      store.removeNode(event.node.id);
      store.toggleShemaStatus(true);
    },
    move(event) {
      console.log("move", event);
      const { dragged, to } = event;
      dragged.parentId = to.id;
      store.toggleShemaStatus(true);
    },
    add(event) {
      const id = event.node.data.id;
      console.log(event);

      let newNode = {};

      if (event.node.data.type === "user") {
        const dep_id = event.node.data.dep_id;
        newNode = new User();
        //fill values by keys:
        Object.keys(newNode).forEach((key) => (newNode[key] = event.node[key]));
        newNode.dep_id = dep_id;
      } else {
        newNode = new Block();
        //fill values by keys:
        Object.keys(newNode).forEach((key) => (newNode[key] = event.node[key]));
      }
      newNode.id = id;

      //console.log(newNode);

      store.addNode(newNode);
      store.toggleShemaStatus(true);
    },
    onDragStart(event) {
      console.log("onDragStart", event);
      this.dragging = true;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto:100&display=swap");

html,
body {
  font-family: "Open Sans", sans-serif;
  font-size: 15px;
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  color: #333;
  letter-spacing: 1px;
  background: #f5f5f5;
  font-weight: 300;
}

.flowy {
  background-repeat: repeat;
  background-size: 30px 30px;
  background-color: #fbfbfb;
  cursor: grab;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

input[type="text"] {
  width: 90%;
  margin: 20px auto 0 auto;
  border-radius: 10px;
  height: 30px;
  border: 0.5px #e2e8f0 solid;
  font-size: 0.9rem;
  padding: 1.5px 6.6px;

  &:focus {
    outline: none !important;
    box-shadow: 0px 0px 0px 3px rgba(0, 144, 237, 0.4);
  }
}

.bg-gray-200 {
  background-color: #fbfbfb !important;
}

div {
  position: relative;
  z-index: 0;
}

.no-wrap {
  white-space: nowrap;
}

h1 {
  margin: 0;
}

h4 {
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1.2rem;
}

.dropzone {
  width: 100px;
  height: 100px;
  border: 1px dotted black;
}

.drag-handle-wrapper {
  position: absolute;
  top: 10px;
  right: 10px;

  .flowy-drag-handle {
    cursor: grab;
  }
}

a {
  text-decoration: none;
}

img {
  border-radius: 10px;
}

.page {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.page:nth-child(2n) {
  background: #f0f0f0;
}
.page.main {
  z-index: 1;
  min-height: 700px;
}

.panel {
  position: fixed;
  width: 20vw;
  top: 2.3vh;
  right: 1.5vw;
  z-index: 10;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s ease-in;
  text-align: center;

  .div-schema-update-warning {
    display: flex;
    flex-direction: column;

    .btn-close-modal {
      align-self: flex-end;
      margin-bottom: 10px;
    }
    span {
      display: block;
      color: #bd4028;
      font-weight: 700;
    }
  }
}

.div-confirmation-modal {
  background: rgba(194, 192, 188, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 101vh;
  width: 101vw;
  right: 39vw;
  top: -17vh;

  .btn-close-modal {
    position: absolute;
    top: 5vh;
    right: 5vw;
  }
}

.scheme-wrapper,
.users-tab-wrapper,
.btn-swipe-collapse {
  transition: all 0.3s ease-in-out 0s;
}

.scheme-wrapper {
  flex: 1;
}

.users-tab-wrapper {
  flex: 0.5;
  min-width: 380px;
  overflow: auto;
  background-color: #fbfbfb;

  .div-user-items {
    .flowy-block {
      margin: 10px 0;

      .user-block {
        background-color: #0e8a96;
        width: 80%;
        height: auto;
        //min-height: 150px;
        border-radius: 20px;
        font-size: 0.85rem;

        div > .main-info-wrapper {
          .text-wrapper {
            margin-left: 10px;
            p,
            a {
              color: #fff;
            }

            a {
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}

button {
  &:focus {
    outline: none !important;
    box-shadow: 0px 0px 0px 3px rgba(0, 144, 237, 0.4);
  }

  &:hover {
    opacity: 0.8;
    transition: all 0.4s ease-out;
  }
}

.btn-swipe-collapse {
  margin: 5px;
  background: #061f8f;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
}

.side {
  margin-top: 30px;
  width: 340px;
  height: 100%;
}

.container {
  height: 100%;
  position: relative;
  width: auto;
  margin: auto;
}

.description {
  text-align: center;
}

.example-block {
  width: 320px;
}

.user-block.draggable-item.draggable-mirror,
.flowy-block.draggable-mirror {
  //opacity: 1;
  display: none;
}
</style>
