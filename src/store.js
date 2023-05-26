import { reactive } from "vue";
import { getUsersScheme } from "@/demo_data/getUsersScheme";
import { parseToConstructors } from "@/lib/parseToConstructors";

export const store = reactive({
  nodes: [],
  async getNodes() {
    if (localStorage.getItem("schema_nodes"))
      this.nodes = parseToConstructors(localStorage.getItem("schema_nodes"));
    else this.nodes = await getUsersScheme();

    console.log(this.nodes);
  },

  hasNode(/**@type {Number} */ id) {
    return this.nodes.findIndex((node) => node.id === id) !== -1;
  },

  addNode(/**@type {Object} */ node) {
    this.nodes.push(node);
  },

  removeNode(/**@type {Number} */ id) {
    const nodeIndex = this.nodes.findIndex((node) => node.id === id);
    this.nodes.splice(nodeIndex, 1);
  },

  updateNode(/**@type {Object} */ updatedNode) {
    const nodeIndex = this.nodes.findIndex((node) => node.id === updatedNode.id);
    this.nodes.splice(nodeIndex, 1, updatedNode);
  },

  saveNodes() {
    localStorage.setItem("schema_nodes", JSON.stringify(this.nodes));
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

  showUserEditForm: false,
  toggleShowUserEditForm() {
    this.showUserEditForm = !this.showUserEditForm;
  },

  editUser: null,
  setEditUser(/**@type {Number} */ userId) {
    this.editUser = this.nodes.find((item) => item.id === userId);
  },
});
