import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios';
export default new Vuex.Store({
    state: {
        data: []
    },
    mutations: {
        'DEFAULT_DATA' (state, payload) {
            state.data = payload
        }
    },
    actions: {
        'DEFAULT_DATA_ACTION' ({ commit }) {
            axios.get('https://api.baxiaobu.com/index.php/home/v5/findUser')
                .then(res => {
                    console.log(res.data)
                    commit('DEFAULT_DATA', res.data.users)
                })
        }
    },
    modules: {}
})