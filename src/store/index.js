import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios';
import qs from 'qs'
export default new Vuex.Store({
    state: {
        data: [],
        Status: 0,
        regStatus: 0
    },
    mutations: {
        //获取数据
        'DEFAULT_DATA' (state, payload) {
            state.data = payload
        },
        //添加
        'ADD_DATA' () {
            window.history.go(0)
        },
        //删除
        'DELETE_DATA' (state, payload) {
            let deldata = state.data;
            deldata = deldata.filter(v => v.id != payload);
            state.data = deldata
        },
        //搜索
        'SEAR_DATA' (state, payload) {
            state.data = payload
        },
        //编辑
        'EDIT_DATA' (state, payload) {
            let editdata = state.data;
            editdata = editdata.map(v => {
                if (payload.id === v.id) {
                    return payload
                } else {
                    return v;
                }
            })
            state.data = editdata
        },
        'LOGIN_DATA' (state, payload) {
            state.Status = payload
        },
        'REG_DATA' (state, payload) {
            state.regStatus = payload
        },
    },
    actions: {
        //获取数据
        'DEFAULT_DATA_ACTION' ({ commit }) {
            axios.get('https://api.baxiaobu.com/index.php/home/v5/findUser')
                .then(res => {
                    commit('DEFAULT_DATA', res.data.users)
                })
        },
        //添加
        'ADD_DATA_ACTION' ({ commit }, b) {
            axios.post('http://api.baxiaobu.com/index.php/home/v5/add', qs.stringify(b))
                .then(() => {
                    commit('ADD_DATA')
                })
        },
        //删除
        'DELETE_DATA_ACTION' ({ commit }, b) {
            axios.post('https://api.baxiaobu.com/index.php/home/v5/deleteUser', qs.stringify(b))
                .then(() => {
                    commit('DELETE_DATA', b)
                })
        },
        //搜索
        'SEAR_DATA_ACTION' ({ commit }, b) {
            axios.get('https://api.baxiaobu.com/index.php/home/v5/findUser?keyword=' + b)
                .then(res => {
                    commit('SEAR_DATA', res.data.users)
                })
        },
        //编辑
        'EDIT_DATA_ACTION' ({ commit }, b) {
            axios.post('https://api.baxiaobu.com/index.php/home/v5/updateUser', qs.stringify(b))
                .then(res => {
                    commit('EDIT_DATA', res.data.data)
                })
        },
        //登录
        'LOGIN_DATA_ACTION' ({ commit }, b) {
            axios.post('http://api.baxiaobu.com/index.php/home/v1/login', qs.stringify(b))
                .then(res => {
                    commit('LOGIN_DATA', res.status)
                })
        },
        //注册
        'REG_DATA_ACTION' ({ commit }, b) {
            axios.post('http://api.baxiaobu.com/index.php/home/v1/register', qs.stringify(b))
                .then(res => {
                    commit('REG_DATA', res.data.status)
                })
        }
    },
    modules: {}
})