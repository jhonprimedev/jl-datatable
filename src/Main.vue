<template>
    <Header 
        :lengthMenu="lengthMenu"
        :length="length"
        @onUpdatedMenu="onUpdatedMenu"
        @onUpdatedSearch="onUpdatedSearch"
    />
    <div class="row">
        <Table
            :columns="columns"
            :order="order"
            :rows="rows"
            @onUpdatedOrder="onUpdatedOrder"
        />
        <Footer
            :length="length"
            :start="start"
            :recordsFiltered="recordsFiltered"
            :recordsTotal="recordsTotal"
            @onUpdatedPagination="onUpdatedPagination"
        />
    </div>    
</template>
<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import Table from './table/General.vue';
import { onMounted, reactive, toRefs, watch } from 'vue';
import useFetch from './composables/useFetch';
import qs from 'qs' 
export default {
    name:'JlDatatable',
    props: {
        url: String,
        requestOptions: {
            type: Object,
            default: {}
        },
        columns: Array,
        order: {
            type: Object,
            default: {
                column: 0,
                dir: 'ASC'
            }
        },
        pageLength: {
            type: Number,
            default: 10
        },
        lengthMenu: {
            type: Array,
            default: [10, 25, 50, 100]
        },
        reset: String
    },
    emits: ['gettingEntries', 'entriesFetched'],
    components: {
        Footer,
        Header,
        Table
    },
    setup(props, { emit} ){

        const data = reactive({
            columns: props.columns,
            length: props.pageLength,
            start: 0,
            search: '',
            order: props.order,
            start: 0,
            recordsFiltered: 0,
            recordsTotal: 0,
            rows: []
        });

        const onUpdatedMenu = (value) => {
            data.length = value;
            data.start = 0;
            getData();
        }

        const onUpdatedSearch = (value) => {
            data.search = value;
            data.start = 0; // reset
            getData();
        }

        const onUpdatedOrder = (value) => {
            data.order = value;
            data.start = 0; // reset
            getData();
        }

        const onUpdatedPagination = (value) => {            
            data.start = value;            
            getData();
        }

        const getData = async() => {
            const parameters = {
                columns: [...data.columns].map(columnsMap),                
                length: data.length,
                search: data.search,
                order: data.order,
                start: data.start
            };
            
            const stringParams = qs.stringify(parameters, { encode: false });

            const endpoint = `${props.url}?${stringParams}`;            
            const request = await useFetch(endpoint, {...props.requestOptions});
            emit('gettingEntries');
            const response = await request.sendRequest();
            emit('entriesFetched');
            data.rows = response.data;
            data.recordsFiltered = response.recordsFiltered;
            data.recordsTotal = response.recordsTotal;            
        }
        
        const columnsMap = (column) => {
            const newColumn =  {...column};
            if(!newColumn.hasOwnProperty('orderable')){
                newColumn.orderable = true;
            }
            if(!newColumn.hasOwnProperty('searchable')){
                newColumn.searchable = true;
            }
            if(newColumn.hasOwnProperty('component')){                
                delete newColumn.component; 
            }
            return newColumn;
        }

        const updatedReset = () => {
            data.columns = props.columns;
            data.length = props.pageLength;
            data.order = props.order;          
            data.start = 0;
            data.search = '';
            data.recordsFiltered = 0;
            data.recordsTotal = 0;
            data.rows = [];
        }

        onMounted(async () => {
            getData();
        });

        watch(() => props.reset, (first, second) => {              
            updatedReset();            
            getData();
        });

        return {
            ...toRefs(data),
            onUpdatedMenu,
            onUpdatedSearch,
            onUpdatedOrder,
            onUpdatedPagination            
        }
    }
}
</script>