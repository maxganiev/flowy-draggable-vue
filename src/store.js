import { reactive } from "vue";

export const store = reactive({
  user: {},
  getUser(/**@type {Object} */ user) {
    this.user = user;
  },
  //users that are allowed to update schema:
  adminsIds: [1186, 2000],
});
