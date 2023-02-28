import { reactive } from "vue";

export const store = reactive({
  user: {},
  getUser(/**@type {Object} */ user) {
    this.user = user;
  },
  //users that are allowed to update schema:
  adminsIds: [1186, 2000],
  //users found against search:
  users: [],
  searchUsers(/**@type {Object[]} */ users) {
    this.users = users;
  },
  removeAddedUser(/**@type {Number} */ userId) {
    const index = this.users.findIndex((item) => item.id === userId);
    this.users.splice(index, 1);
    console.log(this.users.map((item) => item.data.full_name_short));
  },
});
