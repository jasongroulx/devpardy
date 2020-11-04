import Vue from "vue";
import Devpardy from './components/Devpardy.vue'
import Sun from './components/Sun.vue'

Vue.component('devpardy', Devpardy);
Vue.component('sun', Sun);

const app = new Vue({
    el: '#app',
});
