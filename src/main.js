import Vue from "vue";
import FlowyPlugin from "./index.js";
import DemoBlock from "./flow_components/DemoBlock.vue";
import FlowNode from "./flow_components/FlowNode.vue";
import App from "./App.vue";

Vue.use(FlowyPlugin);
Vue.component("DemoBlock", DemoBlock);
Vue.component("FlowNode", FlowNode);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
