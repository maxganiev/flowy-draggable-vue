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
    int: null,
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

  computed: {
    flowy() {
      return document.getElementById("flowy");
    },
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
      if (
        e.target.parentElement.parentElement.className === "flowy-drag-handle" &&
        !this.flowyNodeMirror
      )
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
          top: e.offsetY,
          left: e.offsetX,
          transform: `scale(${document.getElementById("scaler").value})`,
          content: closestEl.innerHTML,
        },
      });
      this.flowyNodeMirror.$mount();
      this.flowy.appendChild(this.flowyNodeMirror.$el);
      this.flowy.addEventListener("mousemove", this.dragFlowyNodeMirror);
      this.flowy.style.cursor = "crosshair";

      this.int = setInterval(() => {
        this.scrollPageWhileDraggingMirror(
          this.flowyNodeMirror.$el.getBoundingClientRect()
        ).start();
      }, 100);
    },

    scrollPageWhileDraggingMirror(rect) {
      let x = 0;
      let y = 0;
      const flowy = this.flowy;

      return {
        start() {
          //X
          const mirrorScrolledPageByX = rect.x / document.body.clientWidth;
          if (mirrorScrolledPageByX >= 0.8)
            flowy.scrollBy({ left: (x += 40), top: 0, behavior: "smooth" });

          //Y
          // const mirrorScrolledPageByY = rect.y / document.body.clientHeight;
          // if (mirrorScrolledPageByY >= 0.9) y -= 40;
          // else if (mirrorScrolledPageByY <= 0.1) y += 40;
        },
      };
    },

    dragFlowyNodeMirror(e) {
      let x, y;
      if (e.target.id === "flowy" && e.target.id === "flowy-node-mirror") {
        x = e.offsetX;
        y = e.offsetY;
      } else {
        x = e.pageX;
        y = e.pageY;
      }

      this.flowyNodeMirror._props.top = y;
      this.flowyNodeMirror._props.left = x;
    },

    onDragStartNewBlock(event) {
      console.log("onDragStartNewBlock", event);
      this.newDraggingBlock = event;
    },
    onDragStopNewBlock(event) {
      console.log("onDragStopNewBlock", event);
      this.newDraggingBlock = null;

      if (this.flowyNodeMirror) {
        if (document.getElementById("flowy-node-mirror"))
          document.getElementById("flowy-node-mirror").remove();

        this.flowy.removeEventListener("mousemove", this.dragFlowyNodeMirror);
        this.flowyNodeMirror = null;
        this.flowy.style.cursor = "grab";
        clearInterval(this.int);
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
