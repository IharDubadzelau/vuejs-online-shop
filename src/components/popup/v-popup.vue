<template>
    <div class="popup-wrapper" ref="popup_wrapper">
        <div class="v-popup">
            <div class="v-popup__header">
                <span>{{popupTitle}}</span>
                <span>
                <i
                        class="material-icons cur_pointer"
                        @click="closePopup"
                >
                    close
                </i>
            </span>
            </div>
            <div class="v-popup__content">
                <slot></slot>
            </div>
            <div class="v-popup__footer">
                <button
                        class="btn-cls"
                        @click="closePopup"
                >
                    Закрыть
                </button>
                <button
                        class="btn"
                        @click="rightBtnAction"
                >
                    {{rightBtnTitle}}
                </button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "v-popup",
        props: {
            popupTitle: {
                type: String,
                default: 'Popup Name'
            },
            rightBtnTitle: {
                type: String,
                default: 'OK'
            }
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            rightBtnAction() {
                this.$emit('rightBtnAction');
            },
            closePopup() {
                this.$emit('closePopup');
            }
        },
        mounted() {
            document.addEventListener('click', (item) => {
                if ( item.target === this.$refs['popup_wrapper'] ) {
                    this.closePopup();
                }
            });
        }
    }
</script>

<style lang="scss">
    .popup-wrapper {
        background: rgba(64,64,64, .4);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
    }

    .v-popup {
        padding: 16px;
        position: fixed;
        top: 50px;
        width: 400px;
        background: $clr-txt;
        box-shadow: 0 0 17px 0 $clr-shadow;
        z-index: 10;
        border-radius: $radius*2;
        &__header, &__footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__content {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .cur_pointer {
        cursor: pointer;
    }
</style>
