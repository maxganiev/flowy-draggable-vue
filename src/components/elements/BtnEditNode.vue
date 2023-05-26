<template>
  <button v-if="render" class="btn btn-edit" @click="onEdit">
    <i class="fa-solid fa-marker"></i>
  </button>
</template>

<script>
import { store } from "@/store";
export default {
  name: "BtnEditNode",

  props: {
    nodeId: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    store,
    //by default
    render: false,
  }),

  beforeMount() {
    //here we check if current user is allowed to update scheme
    this.render = store.adminsIds.includes(store.user.id);
  },

  methods: {
    onEdit() {
      store.toggleShowUserEditForm();
      store.setEditUser(this.$props.nodeId);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-edit {
  background: #fff;
  color: #000;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
}
</style>
