<template>
    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div>Showing {{ startF }} to {{ toF }} of {{ recordsFiltered }} entries {{ filteredStr }}</div>
        <nav>
            <ul class="pagination">
                <li class="page-item" :class="before.class">
                    <a class="page-link"  @click="updatedPagination(before)" >Previous</a>
                </li>
                <li v-for="(pagination, index) in paginations" :key="index"  class="page-item" :class="pagination.class">
                    <a class="page-link"  @click="updatedPagination(pagination)">{{ pagination.number }}</a>
                </li>                
                <li class="page-item" :class="next.class">
                    <a class="page-link" @click="updatedPagination(next)" >Next</a>
                </li>
            </ul>
        </nav>
    </div>    
</template>
<script>
import { reactive, toRefs, watch } from 'vue';
export default {
    name: 'Footer',
    props: {
        length: Number,
        start: Number,
        recordsFiltered: Number,
        recordsTotal: Number
    },
    emits: ['onUpdatedPagination'],
    setup(props, { emit }){
        
        const data = reactive({
            paginations: [],
            start: props.start,
            length: props.length,            
            number: 1,
            next: {
                number: 0,
                class: 'disabled'
            },
            before: {
                number: 0,
                class: 'disabled'
            },
            startF: 0,
            toF: 0,
            filteredStr: ''
        })

        const getPaginations = () => {
            
            let paginationsCount = Math.ceil(data.recordsFiltered / data.length);
            let listPaginations = [...Array(paginationsCount - 1 + 1).keys()].map(x => x + 1);
            if(listPaginations.length > 7){

                // to initlal
                if(data.number >= 1 && data.number <= 4){
                    listPaginations = [...listPaginations.slice(0, 5), 0, listPaginations.at(-1)];
                }else if(data.number <=  listPaginations.at(-1) && data.number >= listPaginations.at(-4)){
                    // to final
                    listPaginations = [listPaginations.at(0), 0, ...listPaginations.slice(listPaginations.at(-1) - 5, listPaginations.at(-1))];
                }else {
                    // to mid
                    listPaginations = [listPaginations.at(0), 0, ...listPaginations.slice(data.number -2, data.number + 1) , 0, listPaginations.at(-1)];
                }             
            }
            
            data.paginations = listPaginations.map((pagination) => {
                return {
                    number: pagination != 0 ? pagination : '...',
                    class: pagination != 0 ? data.number == pagination ? 'active' : '': 'disabled'                    
                }
            });
            
            const before = data.paginations.find(p => p.class == 'active' && p.number > 1);            
            const next = data.paginations.find(p => p.class == 'active' && p.number < data.paginations.at(-1).number);
            if(before){
                data.before.number = before.number - 1;
                data.before.class = '';
            }else{
                data.before = {
                    number: 0,
                    class: 'disabled'
                };
            }

            if(next){
                data.next.number = next.number + 1;
                data.next.class = '';
            }else{
                data.next = {
                    number: 0,
                    class: 'disabled'
                };
            }
            
            // footer string
            if(data.number == listPaginations.at(-1)){                
                data.startF = data.start + 1;
                data.toF = data.recordsFiltered;
            }else{
                data.startF = data.start + 1;
                data.toF = data.number * data.length;
            }

            // footer strinf filtered            
            data. filteredStr = data.recordsFiltered != data.recordsTotal ? `(filtered from ${data.recordsTotal} total entries)` : '';
        }

        const updatedPagination = (pagination) => {            
            if(pagination.number != '...' && data.number != pagination.number){                
                data.number = pagination.number;                
                data.start = (data.length * pagination.number) - data.length;
                
                emit('onUpdatedPagination', data.start);
            }
        }


        watch(props, () => {         
            if(data.start != props.start){
                data.number = 1;
            }

            data.start = props.start; 
            data.recordsFiltered = props.recordsFiltered; 
            data.recordsTotal = props.recordsTotal; 
            data.length = props.length; 
            getPaginations();
        });

        return {
            ...toRefs(data),
            updatedPagination
        }
    }
}
</script>

<style lang="css" scoped>
    li {
        cursor: pointer;
    }
</style>>
    
