import axios from "axios";

export default {
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
    }
}
