export default {
    ADD_TO_CART({commit}, product) {
        commit('SET_CART', product);
    },
    INC_CART_ITEM({commit}, index){
        commit('CHANGE_COUNT_ITEM', { index: index, count: 1});
    },
    DEC_CART_ITEM({commit}, index){
        commit('CHANGE_COUNT_ITEM', { index: index, count: -1});
    },
    DELETE_FROM_CART({commit}, index) {
        commit('REMOVE_FROM_CART',index);
    }
}
