<template>
    <div class="v-main-wrapper">
        <p>{{title}}</p>

        <hr>
        <v-catalog />
        <hr>
        <v-cart
                v-if="CART.length"
                :cart_data="CART"
        />
    </div>
</template>

<script>
import vCatalog from './v-catalog';
import vCart from './v-cart';
import {mapGetters} from 'vuex'

export default {
    //Имя компонента - обязательный параметр
    name: "v-main-wrapper",
    //Дети этого компонента
    components: {
        vCatalog,
        vCart
    },
    //то что прилетает из родителя
    props: {
    },
    //возращаемые данные этого компонента - персональные данные
    data() {
        return{
            title: 'Main wrapper'
        }
    },
    //вычислительные св-ва компонента
    computed: {
        ...mapGetters([
            'CART'
        ])
    },
    //здесь отлавдиваются действия пользователя
    //различные клики, показы модальных окон, скрытие показ элементов, анимации и т.д.
    methods: {},
    //здесь мы следим, отлавливаем изменения, что происходит в компоненте
    watch: {},
//--- хуки жизненого цикла ---
    //отрабатывает когда компонент полностью загрузится - один из основных
    mounted() {
        console.log('I: hook - mounted');
    }
}
</script>

<style>
 .v-main-wrapper {
     max-width: 900px;
     margin: 0 auto;
 }
</style>
