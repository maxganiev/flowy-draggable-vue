import Vue from "vue";
import FlowyPlugin from "./index.js";
import NewFlowNode from "./components/core/flowy_nodes/new_nodes/NewFlowNode.vue";
import NewFlowBlock from "./components/core/flowy_nodes/new_nodes/NewFlowBlock.vue";
import FlowNode from "./components/core/flowy_nodes/existing_nodes/FlowNode.vue";
import App from "./App.vue";

Vue.use(FlowyPlugin);
Vue.component("NewFlowNode", NewFlowNode);
Vue.component("NewFlowBlock", NewFlowBlock);
Vue.component("FlowNode", FlowNode);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
