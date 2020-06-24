import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Directives from './directives'; 
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

//mock 虚假数据
import "./mock";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Directives);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
