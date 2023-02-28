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
          <label for="radio-add-user"> подгруппу (блок) </label>
        </div>
        <div class="side z-50" v-if="addType === 'user'">
          <SearchUsers />

          <div v-if="store.users.length > 0">
            <flowy-new-block
              v-for="(item, index) in store.users"
              :key="index"
              @drag-start="onDragStartNewBlock"
              @drag-stop="onDragStopNewBlock"
            >
              <template v-slot:preview="{}">
                <flow-users-tab
                  :id="item.id"
                  :dep_id="item.dep_id"
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
                  :full_name_short="item.data.full_name_short"
                  :avatar_thumb="item.data.avatar_thumb"
                  :position_name="item.data.position_name"
                  :profileUrl="item.data.profileUrl"
                  :descr="item.data.descr"
                />
              </template>
            </flowy-new-block>
          </div>
        </div>
        <div class="side z-50" v-else>
          <p>123</p>
        </div>
      </div>

      <button
        v-if="renderUsersTab"
        class="btn-swipe-collapse"
        :style="{
          transform: usersTabCollapsed
            ? `translateX(-${this.$refs.usersTab.getBoundingClientRect().width}px)`
            : 'translateX(0)',
        }"
        v-on:click="swipeUsersTabCollapse"
      >
        {{ !usersTabCollapsed ? "-" : "+" }}
      </button>

      <div class="flex-grow overflow-auto scheme-wrapper" ref="schemeWrapper">
        <flowy
          v-if="nodes.length > 0"
          class="h-full w-full p-6"
          :nodes="nodes"
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
import { blocks } from "./demo_data/sampleBlocks";
import { getUsersScheme } from "./demo_data/getUsersScheme";
import { getCurrentUser } from "./demo_data/getCurrentUser";
import { store } from "./store";
import SearchUsers from "./components/SearchUsers.vue";
import { User } from "./lib/constructors/User";

export default {
  name: "app",

  data: () => ({
    store,
    users: [],
    holder: [],
    dragging: false,
    blocks,
    nodes: [],
    newDraggingBlock: null,
    usersTabCollapsed: false,
    addType: "user",
    renderUsersTab: false,
    usersTab: null,
    schemeWrapper: null,
  }),

  components: { SearchUsers },

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
      this.$refs.usersTab.style.transform = "translateX(0%)";
    },
    onDropBlock(_event) {},
    beforeAdd(event) {
      console.log("before add", event);
      //store.removeAddedUser(event.to.data.id);
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
      //const id = this.generateId();
      this.nodes.push(_event.node);
    },
    remove(event) {
      // const nodeIndex = findIndex(this.nodes, { id: event.node.id });
      //findIndex(this.nodes, { id: event.node.id });
      const nodeIndex = this.nodes.findIndex((node) => node.id === event.node.id);
      this.nodes.splice(nodeIndex, 1);
    },
    move(event) {
      console.log("move", event);
      const { dragged, to } = event;
      dragged.parentId = to.id;
      console.log(this.nodes);
    },
    add(event) {
      const id = event.node.data.id;
      const dep_id = event.node.data.dep_id;

      //swipe old values by keys:
      const newNode = new User();
      Object.keys(newNode).forEach((key) => (newNode[key] = event.node[key]));
      newNode.id = id;
      newNode.dep_id = dep_id;

      // console.log(newNode);

      this.nodes.push(newNode);
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
      this.nodes = await getUsersScheme();
      console.log(this.nodes);
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
  color: #333;
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

.users-tab-wrapper {
  width: 60%;
  overflow: auto;
}

.btn-swipe-collapse {
  position: absolute;
  top: 5px;
  z-index: 2000;
  left: 366.3px;
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
