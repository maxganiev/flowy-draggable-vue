import { reactive } from "vue";

export const store = reactive({
  nodes: [],
  getNodes(/**@type {Object[]} */ nodes) {
    this.nodes = nodes;
  },
  addNode(/**@type {Object} */ node) {
    this.nodes.push(node);
  },
  removeNode(/**@type {Number} */ id) {
    const nodeIndex = this.nodes.findIndex((node) => node.id === id);
    this.nodes.splice(nodeIndex, 1);
  },
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
  },

  loading: false,
  toggleLoading() {
    this.loading = !this.loading;
  },

  shemaIsUpdated: false,
  toggleShemaStatus(/**@type {Boolean} */ updateStatus) {
    this.shemaIsUpdated = updateStatus;
  },
});
