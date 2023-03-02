<template>
  <button v-if="render" class="btn btn-remove" @click="remove()">x</button>
</template>

<script>
import { store } from "../store";
export default {
  name: "BtnRemoveFlowyNode",
  props: {
    remove: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    //by default
    render: false,
  }),
  beforeMount() {
    //here we check if current user is allowed to update scheme
    this.render = store.adminsIds.includes(store.user.id);
  },
};
</script>

<style lang="scss" scoped>
.btn-remove {
  position: absolute;
  bottom: 45px;
  right: 5px;
  background: #bd4028;
  color: #fff;
  font-weight: 700;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 1rem;
}
</style>
