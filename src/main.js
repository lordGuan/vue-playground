import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import {Slider} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(Slider)
let testPlugin = {
    install(Vue) {
        Vue.prototype.$test = function () {
            this.$store.commit('increment');
        };
    },
};

Vue.use(testPlugin)
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        increment(state) {
            state.count++;
        },
    },
});

new Vue({
    render: h => h(App),
    store,
}).$mount('#app');
