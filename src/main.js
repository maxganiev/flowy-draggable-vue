import Vue from "vue";
import FlowyPlugin from "./index.js";
import NewFlowNode from "./components/core/flowy_nodes/new_nodes/NewFlowNode.vue";
import NewFlowBlock from "./components/core/flowy_nodes/new_nodes/NewFlowBlock.vue";
import FlowNode from "./components/core/flowy_nodes/existing_nodes/FlowNode.vue";
import ShemaApp from "pages/ShemaApp.vue";
import NotFound from "pages/NotFound.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
/* import specific icons */
import { faClone } from "@fortawesome/free-solid-svg-icons";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

[
  faClone,
  faScrewdriverWrench,
  faPeopleRoof,
  faMarker,
  faChartLine,
  faChevronUp,
  faChevronDown,
].forEach((icon) => library.add(icon));

Vue.use(FlowyPlugin);
Vue.component("NewFlowNode", NewFlowNode);
Vue.component("NewFlowBlock", NewFlowBlock);
Vue.component("FlowNode", FlowNode);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

const About = { template: "<p>about page</p>" };

const routes = {
  "/interactive-scheme/": ShemaApp,
  "/interactive-scheme/about": About,
};

new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname,
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});
