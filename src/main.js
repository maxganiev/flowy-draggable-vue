import Vue from "vue";
import FlowyPlugin from "./index.js";
import FlowUsersTab from "./flow_components/FlowUsersTab.vue";
import FlowNode from "./flow_components/FlowNode.vue";
import App from "./App.vue";

Vue.use(FlowyPlugin);
Vue.component("FlowUsersTab", FlowUsersTab);
Vue.component("FlowNode", FlowNode);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
