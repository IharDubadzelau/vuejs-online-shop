<template>
    <div class="v-cart">
        <router-link :to="{name: 'catalog'}">
            <div class="v-cart__link_to_cart rds"> обратно </div>
        </router-link>
        <h1>Корзина</h1>
        <p v-if="!cart_data.length">В корзине нет товаров...</p>
        <v-cart-item
            v-for="(item, index) in cart_data"
            :key="item.article"
            :cart_item_data = "item"
            @deleteFromCart = "deleteFromCart(index)"
            @increment = "incItem(index)"
            @decrement = "decItem(index)"
        />
        <div class="v-cart__total rds2">
            <p class="v-cart__name">Итого: </p>
            <p>{{cartTotalCost}} руб.</p>
        </div>
    </div>
</template>

<script>
import vCartItem from './v-cart-item';
import {mapActions} from 'vuex';

export default {
    name: "v-cart",
    components: {
        vCartItem
    },
    props: {
        cart_data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {return{}},
    methods: {
        ...mapActions([
            'DELETE_FROM_CART',
            'INC_CART_ITEM',
            'DEC_CART_ITEM'
        ]),
        incItem(index) {
            this.INC_CART_ITEM(index);
        },
        decItem(index) {
            this.DEC_CART_ITEM(index);
        },
        deleteFromCart(index) {
            this.DELETE_FROM_CART(index);
        }
    },
    computed:{
        cartTotalCost() {
            let summa = 0;

            if ( this.cart_data.length ) {
                this.cart_data.forEach( item => {
                    summa += item.price * item.quantity;
                });
            }
            return summa;
        }

    }
}
</script>

<style lang="scss">
    .v-cart {
        margin-bottom: 120px;

        &__link_to_cart {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: $padding;
            border: solid 1px #aeaeae;
        }
        &__total {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            padding: $padding*2;
            display: flex;
            justify-content: center;
            background: $clr-bg;
            color: $clr-txt;
            font-size: 20px;
        }
        &__name {
            margin-right: $margin*2;
        }
    }
</style>
