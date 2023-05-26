<template>
  <aside
    class="z-40 pl-6 pt-6 bg-white border-r border-grey-400 aside"
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
      <NewUsersAdder
        :users="users"
        v-if="users.length && searchStart"
        :on-drag-start-new-block="onDragStartNewBlock"
        :on-drag-stop-new-block="onDragStopNewBlock"
        :on-mousedown="onMousedown"
      />
      <h4 style="margin: 20px" v-else-if="users.length === 0 && searchStart">
        Пользователи не найдены.
      </h4>
    </div>
    <div class="side z-50" @mousedown="onMousedown" v-else>
      <NewBlockAdder :on-drag-start="onDragStartNewBlock" :on-drag-stop="onDragStopNewBlock" />
    </div>

    <button class="btn-swipe-collapse" @click="swipeUsersTabCollapse">
      {{ !usersTabCollapsed ? "-" : "+" }}
    </button>
  </aside>
</template>

<script>
import SearchUsers from "./SearchUsers.vue";
import NewUsersAdder from "./NewUsersAdder.vue";
import NewBlockAdder from "./NewBlockAdder.vue";
import Vue from "vue";
import Mirror from "../core/flowy_components/Mirror.vue";

export default {
  name: "Aside",
  data: () => ({
    usersTabCollapsed: false,
    usersTab: null,
    addType: "user",
    searchStart: false,
    newDraggingBlock: null,
    MirrorConstructor: Vue.extend(Mirror),
    flowyNodeMirror: null,
  }),

  props: {
    users: Array,
    required: true,
  },

  components: {
    SearchUsers,
    NewUsersAdder,
    NewBlockAdder,
  },

  methods: {
    toggleSearch(searchStart) {
      this.searchStart = searchStart;
    },

    swipeUsersTabCollapse() {
      this.usersTabCollapsed = !this.usersTabCollapsed;

      setTimeout(() => {
        this.usersTabCollapsed
          ? this.$refs.usersTab.classList.add("collapsed")
          : this.$refs.usersTab.classList.remove("collapsed");
      }, 100);
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
          top: e.pageY,
          left: e.clientX - closestEl.getBoundingClientRect().width,
          transform: `scale(${this.schemaScale})`,
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

      el.style.top = e.pageY + "px";
      el.style.left = e.clientX - rect.width + "px";
    },

    onDragStartNewBlock(event) {
      console.log("onDragStartNewBlock", event);
      this.newDraggingBlock = event;
    },
    onDragStopNewBlock(event) {
      console.log("onDragStopNewBlock", event);
      this.newDraggingBlock = null;

      if (document.getElementById("flowy-node-mirror")) {
        this.flowyNodeMirror = null;
        document.getElementById("flowy-node-mirror").remove();
        document.body.removeEventListener("mousemove", this.dragFlowyNodeMirror);
        document.getElementById("flowy").style.cursor = "grab";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  accent-color: $clr-emerald;
}

aside {
  flex: 0.5;
  height: 100vh;
  background-color: $clr-milk;
  position: fixed;
  top: 0;
  left: 0;
  width: 370px;
  z-index: 150;
  transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);

  .side {
    margin-top: 30px;
    width: 100%;
    height: 80%;
    overflow-y: scroll;
  }

  .btn-swipe-collapse {
    background: $clr-orange;
    color: #fff;
    font-weight: 700;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    font-size: 1rem;
    position: absolute;
    top: 10px;
    left: 101%;
  }
}
</style>
