export default {
    SWITCH_MOBILE:  state => {
        state.isMobile = true;
        state.isDesktop = false;
    },
    SWITCH_DESKTOP:  state => {
        state.isMobile = false;
        state.isDesktop = true;
    },
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products;
    },
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
    CHANGE_COUNT_ITEM: (state, obj) => {
        state.cart[obj.index].quantity += obj.count;
        if ( state.cart[obj.index].quantity<1 ) {
            state.cart[obj.index].quantity = 1;
        }
    },
    REMOVE_FROM_CART: (state, index) => {
        state.cart.splice(index,1);
    }
}
