<template>
  <div class="h-screen w-screen bg-gray-200 flex flex-col flex-no-wrap overflow-none">
    <div class="flex-grow flex flex-row flex-no-wrap overflow-hidden">
      <div
        v-if="renderUsersTab"
        class="z-40 pl-6 pt-6 bg-white border-r border-grey-400 users-tab-wrapper"
        :style="{ transform: usersTabCollapsed ? 'translateX(-100%)' : 'translateX(0%)' }"
        ref="usersTab"
      >
        <div class="addtypes-radio-wrapper">
          <span> Добавить: </span>
          <br />
          <input type="radio" id="radio-add-user" value="user" v-model="addType" />
          <label for="radio-add-user"> пользователя </label>
          <br />
          <input type="radio" id="radio-add-block" value="block" v-model="addType" />
          <label for="radio-add-block"> подгруппу (блок) </label>
        </div>

        <div class="side z-50" v-if="addType === 'user'">
          <SearchUsers />

          <div class="div-user-items" v-if="store.users.length > 0">
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
          <p style="margin: 20px" v-else>Пользователи не найдены.</p>
        </div>
        <div class="side z-50" v-else>
          <BlockAdder :on-drag-stop="onDragStopNewBlock" />
        </div>
      </div>

      <button v-if="renderUsersTab" class="btn-swipe-collapse" v-on:click="swipeUsersTabCollapse">
        {{ !usersTabCollapsed ? "-" : "+" }}
      </button>

      <div class="flex-grow overflow-auto scheme-wrapper" ref="schemeWrapper">
        <flowy
          v-if="store.nodes.length > 0"
          class="h-full w-full p-6"
          :nodes="store.nodes"
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
  }),

  components: { SearchUsers, BlockAdder },

  methods: {
    swipeUsersTabCollapse() {
      this.usersTabCollapsed = !this.usersTabCollapsed;

      setTimeout(() => {
        this.$refs.usersTab.style.display = this.usersTabCollapsed ? "none" : "block";
        //this.$refs.schemeWrapper.style.transform = "translateX(0)";
      }, 200);
    },

    onDragStartNewBlock(event) {
      console.log("onDragStartNewBlock", event);
      this.newDraggingBlock = event;
      this.$refs.usersTab.style.transform = "unset";
    },
    onDragStopNewBlock(event) {
      console.log("onDragStopNewBlock", event);
      this.newDraggingBlock = null;
    },
    onDropBlock(_event) {},
    beforeAdd(event) {
      console.log("before add", event);
      store.removeAddedUser(event.to.data.id);
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
    },
    remove(event) {
      // const nodeIndex = this.nodes.findIndex((node) => node.id === event.node.id);
      // this.nodes.splice(nodeIndex, 1);
      store.removeNode(event.node.id);
    },
    move(event) {
      console.log("move", event);
      const { dragged, to } = event;
      dragged.parentId = to.id;
      console.log(store.nodes);
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
    },
    onDragStart(event) {
      console.log("onDragStart", event);
      this.dragging = true;
    },
  },
  async created() {
    await getCurrentUser().then(async (res) => {
      store.getUser(res);
      //here we check if current user is allowed to update scheme
      this.renderUsersTab = store.adminsIds.includes(store.user.id);
      //this.nodes = await getUsersScheme();
      store.getNodes(await getUsersScheme());
      console.log(store.nodes);
    });
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
  background-image: url("/flowy-vue/demo_assets/tile.png");
  background-repeat: repeat;
  background-size: 30px 30px;
  background-color: #fbfbfb;
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
  overflow: auto;
  background-color: #fbfbfb;

  .div-user-items {
    .flowy-block {
      margin: 10px 0;

      .user-block {
        background-color: #0e8a96;
        width: 80%;
        height: auto;
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

.flowy-block.draggable-mirror {
  opacity: 1;
}
</style>
