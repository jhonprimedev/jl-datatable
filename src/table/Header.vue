<template>
    <thead class="table-light">
        <tr>
            <template v-for="(column, index) in columns" :key="index">
                <th data-sortable="true" @click="sort(index)">
                    <span>{{ column.label }}</span>
                    <img v-if="isSort(index)" :src="imgSort(index)" >
                </th>                
            </template>
        </tr>
    </thead>
</template>
<script>
import imgSortAsc from '../assets/images/sort_asc.png';
import imgSortDesc from '../assets/images/sort_desc.png';
import imgSortBoth from '../assets/images/sort_both.png';
import { reactive } from 'vue';
export default {
    props: {
        columns: Array,
        order: Object
    },
    emits: ['onUpdatedOrder'],
    setup(props, { emit }){
        const data = reactive({
            column: props.order.column,
            dir: props.order.dir,            
        });

        const sortStr = {
            asc: 'ASC',
            desc: 'DESC'
        };

        const sort = (index = 0) => {        
            if(isSort(index)){
                if(data.column === index){                
                    if(data.dir === sortStr.asc){                    
                        data.dir = sortStr.desc;
                    }else {                
                        data.dir = sortStr.asc;
                    }
                }else{                
                    data.dir = sortStr.asc;
                }            
                data.column = index;          
                emit('onUpdatedOrder', {...data});                
            }            
        };

        const imgSort = (index = 0, dir = sortStr.asc) => {
            return data.column === index ? (data.dir === dir ? imgSortAsc : imgSortDesc) : imgSortBoth;                                        
        };

        const isSort = (index) => {
            return props.columns[index].orderable !== false;
        }

        return {                  
            sort,
            imgSort,
            isSort            
        }
    }
}
</script>

<style lang="css" scoped>
    th:hover {
        cursor: pointer;
    }
</style>>
    
