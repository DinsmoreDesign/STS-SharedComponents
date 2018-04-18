// Import JS libraries:
import Vue from "vue";
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

// Import font libraries:
import FontAwesome from 'font-awesome/css/font-awesome.css';
import CustomIcons from "./assets/css/icons.scss";

// Import our app:
import App from "./App.vue";

// Create the Vue instance on #app
new Vue({
    el: "#app",
    render: h => h(App)
});
