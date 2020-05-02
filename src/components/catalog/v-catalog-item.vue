<template>
    <div class="v-catalog-item">
        <v-popup
                v-if="isInfoPopupVisible"
                rightBtnTitle="в Корзину"
                :popupTitle="product_data.name"
                @rightBtnAction="addToCart"
                @closePopup="closeInfoPopup"
        >
            <img
                    class="v-catalog-item__image"
                    :src=" require('../../assets/images/' + product_data.image)"
                    alt="img"
            >
            <div>
                <p class="v-catalog-item__name">{{product_data.name}}</p>
                <p class="v-catalog-item__price">цена: {{product_data.price}} руб.</p>
                <p class="v-catalog-item__price">{{product_data.category}}</p>
            </div>

        </v-popup>

        <img
                class="v-catalog-item__image"
                :src=" require('../../assets/images/' + product_data.image)"
                alt="img"
        >
        <p class="v-catalog-item__name">{{product_data.name}}</p>
        <p class="v-catalog-item__price">цена: {{product_data.price}} руб.</p>

        <div class="v-catalog-item__footer">
            <button
                    class="btn-info"
                    @click="showPopupInfo"
            >
                Инфо.
            </button>
            <button
                    class="btn"
                    @click="addToCart"
            >
                в Корзину
            </button>
        </div>


    </div>
</template>

<script>
import vPopup from '../popup/v-popup'
export default {
    name: "v-catalog-item",
    components: {
        vPopup
    },
    props: {
        product_data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return{
            isInfoPopupVisible: false
        }
    },
    computed:{},
    methods: {
        showPopupInfo() {
            this.isInfoPopupVisible = true;
        },
        closeInfoPopup() {
            this.isInfoPopupVisible = false;
        },
        addToCart() {
            this.$emit('addToCart', this.product_data);
        }
    }
}
</script>

<style lang="scss">
    .v-catalog-item {
        flex-basis: 25%;
        box-shadow: 0 0 8px 0 $clr-shadow;
        padding: $padding*2;
        margin-bottom: $margin*2;
        &__image {
            width: 100px;
        }
        &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
