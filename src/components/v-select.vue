<template>
    <div class="v-select">
        <p
                class="title"
                @click="areOptionsVisible = !areOptionsVisible"
        >{{selected}}</p>
        <div
                class="options"
                v-if="areOptionsVisible || isExpanded"
        >
            <p
                v-for="option in options"
                :key="option.value"
                @click="selectOption(option)"
            >
                {{option.name}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "v-select",
    props: {
        options: {
            type: Array,
            default() {
                return []
            }
        },
        selected: {
            type: String,
            default: ''
        },
        isExpanded: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            areOptionsVisible: false
        }
    },
    computed: {},
    methods: {
        hideSelect() {
            this.areOptionsVisible = false;
        },
        selectOption(option) {
            this.$emit('select', option);
            this.hideSelect();
        }
    },
    mounted() {
        document.addEventListener('click', this.hideSelect.bind(this), true);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.hideSelect);
    }
}
</script>

<style>
    .v-select {
        position: relative;
        width: 200px;
        cursor: pointer;
    }

    .title {
        border: solid 1px #aeaeae;
    }

    .v-select p {
        margin: 0;
    }

    .options {
        border: solid 1px #aeaeae;
        position: absolute;
        top: 30px;
        right: 0;
        width: 100%;
    }

    .options p:hover {
        background: #728ce7;
    }
</style>
