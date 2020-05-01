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

            let isExistProduct = false;

            if (state.cart.length) {
                state.cart.map( item => {
                   if ( item.article === product.article ) {
                       item.quantity++;
                       isExistProduct = true;
                   }
                });
            }

            if ( !isExistProduct ) {
                state.cart.push(product);
            }
        },
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
