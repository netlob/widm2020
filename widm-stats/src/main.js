import Vue from "vue";
// import Vuetify from "vuetify";
import vuetify from "vuetify"; // path to vuetify export
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
