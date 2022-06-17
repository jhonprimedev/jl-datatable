<template>
    <table class="table table-hover table-responsive align-middle">
        <Header
            :columns="columns"
            :order="order"
            @onUpdatedOrder="onUpdatedOrder"
        />
        <Body
            :columns="columns"
            :rows="rows"
        />
    </table>            
</template>
<script>
import Header from './Header.vue';
import Body from './Body.vue';
export default {
    name: 'Table',
    props: {
        columns: Array,
        order: Object,
        rows: Array
    },
    components: {
        Header,
        Body
    },
    emits: ['onUpdatedOrder'],
    setup(props, { emit }){
        const onUpdatedOrder = (value) => {            
            emit('onUpdatedOrder', value);
        }
        return { onUpdatedOrder }
    }
}
</script>