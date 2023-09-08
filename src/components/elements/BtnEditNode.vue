<template>
  <button class="btn btn-edit" @click="onEdit" title="Редактировать узел">
    <font-awesome-icon icon="fa-solid fa-marker" />
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
  }),

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
