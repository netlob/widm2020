import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCharts from "vue-chartjs";
import { Bar, Line } from "vue-chartjs";
import lineChart from "./components/LineChart";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

Vue.use(VueCharts);

Vue.component("line-chart", lineChart);

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
