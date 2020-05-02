import  Vue from 'vue';
import  Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let store = new Vuex.Store( {
    //переменные, данные, массивы и т.д.
    state: {
        products: [],
        cart: []
    },
    //мутации - действия синхронные над данными (с очередью)
    mutations: {
        SET_PRODUCTS_TO_STATE: ((state, products) => {
            state.products = products;
        }),
        SET_CART: (state, product) => {
            if (state.cart.length) {
                let isProductExists = false;
                state.cart.map(function (item) {
                    if (item.article === product.article) {
                        isProductExists = true;
                        item.quantity++
                    }
                })
                if (!isProductExists) {
                    state.cart.push(product)
                }
            } else {
                state.cart.push(product)
            }
        },
        CHANGE_COUNT_ITEM: ((state, obj) => {
            state.cart[obj.index].quantity += obj.count;
            if ( state.cart[obj.index].quantity<1 ) {
                state.cart[obj.index].quantity = 1;
            }
        }),
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index,1);
        }
    },
    //действия асинхронные над данными
    actions: {
        GET_PRODUCTS_FROM_API({commit}) {
            return axios('http://localhost:3000/products', {
                method: "GET"
            })
                .then( products => {
                    commit('SET_PRODUCTS_TO_STATE', products.data);
                    return products.data;
                })
                .catch( error => {
                    console.log("Error read Products from API: ",error);
                    return error;
                })
        },
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
    },
    //короткий путь до данных чтобы получить из стейта(state)
    getters: {
        PRODUCTS(state) {
            return state.products;
        },
        CART(state) {
            return state.cart;
        }
    }
});

export default store;
