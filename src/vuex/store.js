import  Vue from 'vue';
import  Vuex from 'vuex';

import apiRequests from "./actions/api_requests";
import commonActions from "./actions/actions";
import mutations from "./mutations/mutations";
import getters from "./getters/getters";
import state from "./state/state";

const actions = {...commonActions, ...apiRequests};

Vue.use(Vuex);

let store = new Vuex.Store( {
    //переменные, данные, массивы и т.д.
    state,
    //мутации - действия синхронные над данными (с очередью)
    mutations,
    //действия асинхронные над данными
    actions,
    //короткий путь до данных чтобы получить из стейта(state)
    getters
});

export default store;
