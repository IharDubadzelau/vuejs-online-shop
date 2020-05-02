<template>
    <div class="v-catalog">
        <router-link :to="{name: 'cart', params: {cart_data: CART}}">
            <div class="v-catalog__link_to_cart">
                корзина: {{CART.length}}
            </div>
        </router-link>

        <h1>Catalog</h1>

        <div class="filters">
            <v-select
                    :selected="selected"
                    :options="categories"
                    @select="sortByCategories"
                    :isExpanded="IS_MOBILE"
            />
            <div class="range-slider">
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    v-model.number="minPrice"
                    @change="setRangeSliders"
                >
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    v-model.number="maxPrice"
                    @change="setRangeSliders"
                >
            </div>

            <div class="range-values">
                <p>Min: {{minPrice}}</p>
                <p>Max: {{maxPrice}}</p>
            </div>

        </div>



        <div class="v-catalog__list">
            <v-catalog-item
                v-for="product in filteredProducts"
                :key="product.article"
                :product_data="product"
                @addToCart="addToCart"
            />
        </div>

    </div>
</template>

<script>
import vCatalogItem from './v-catalog-item';
import {mapActions, mapGetters} from 'vuex';
import vSelect from '../v-select';

export default {
    name: "v-catalog",
    components: {
        vCatalogItem,
        vSelect
    },
    props: {},
    data() {
        return{
            categories: [
                {name: 'Все', value: 'ALL'},
                {name: 'Мужские', value: 'м'},
                {name: 'Женские', value: 'ж'}
            ],
            selected: 'Все',
            sortedProducts: [],
            minPrice: 0,
            maxPrice: 1000
        }
    },
    computed:{
        ...mapGetters([
            'PRODUCTS',
            'CART',
            'IS_MOBILE',
            'IS_DESKTOP'
        ]),
        filteredProducts() {
            if ( !this.sortedProducts.length ) {
                this.sortByCategories();
            }

            return this.sortedProducts;
        }
    },
    methods: {
        ...mapActions([
           'GET_PRODUCTS_FROM_API',
            'ADD_TO_CART'
        ]),
        setRangeSliders() {
            if (this.minPrice>this.maxPrice ) {
                let tmp = this.maxPrice;
                this.maxPrice =  this.minPrice;
                this.minPrice = tmp;
            }
            this.sortByCategories();
        },
        sortByCategories(category) {
            if (category) {
                this.selected = category.name;
            }

            this.sortedProducts = this.PRODUCTS.filter( (item) => {
                return (
                    item.price >= this.minPrice &&
                    item.price <= this.maxPrice && (
                        this.selected === 'Все' ||
                        item.category === this.selected
                    )
                );
            });
        },
        addToCart(data) {
            this.ADD_TO_CART(data);
        }
    },
    mounted() {
        this.GET_PRODUCTS_FROM_API()
            .then( (response) => {
               if (response) {
                   this.sortByCategories();
               }
            });
    }
}
</script>



<style lang="scss">
    .v-catalog {
        &__list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
        }
        &__link_to_cart {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: $padding*2;
            border: solid 1px #aeaeae;

        }
    }

    .filters {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .range-slider {
        width: 200px;
        margin: auto 16px;
        text-align: center;
        position: relative;
    }

    .range-slider svg, .range-slider input[type=range] {
        position: absolute;
        left: 0;
        bottom: 0;
    }

    input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: 2px;
        margin-top: -7px;
    }
</style>
