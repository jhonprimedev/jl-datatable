<template>
    <thead class="table-light">
        <tr>
            <template v-for="(column, index) in columns" :key="index" >
                <th v-if="typeof column === 'object'" @click="sort(column, sortable)" :width="column.width"  >
                    {{ column.title}}
                    <img v-if="isSort &&!column.isAction" :src="sortBy == column.key ? (iconSortPath ? iconSortPath : iconSortBothPath) : iconSortBothPath" >
                </th>
            </template>
        </tr>
    </thead>
</template>
<script>
export default {
    props: {
        columns: {
            required: true,
            type: Array,
        },
        isSort: Boolean,
        sortDt: Object
    },
    emits: ['changeSort'],
    data() {
        return {
            sortBy: this.isSort ? (this.sortDt.sortBy ? this.sortDt.sortBy : null) : null,
            sortable: this.isSort ? this.isSortable() : true,
            iconSortPath: this.isSort ? this.isIconSortPath() : null,
            iconSortBothPath: require('./assets/images/sort_both.png')
        }
    },

    methods: {
        sort(column, sortable){        
            if(this.isSort){
                if(column.isSort === true || column.isSort === undefined){
                    if(!column.isAction === true){
                        this.sortable = this.sortBy !== column.key ? true : !sortable;
                        this.iconSortPath = this.sortable ? require('./assets/images/sort_asc.png') : require('./assets/images/sort_desc.png');
                        this.sortBy = column.key;
    
                        this.$emit('changeSort', {
                            isSort: this.isSort,
                            sort:{
                                sortBy: this.sortBy,
                                sort: this.sortable ? 'ASC' : 'DESC'
                            },
                            column
                        });
                    }
                }            
            }else{
                this.$emit('changeSort', {
                    isSort: this.isSort,
                    sort:{
                        sortBy: null,
                        sort: null
                    },
                    column
                });
            }
        },
        isSortable(){
            if(this.sortDt.sort === 'ASC'){                
                return true;
            }else if (this.sortDt.sort === 'DESC'){                
                return false;
            }
            return true;
        },
        isIconSortPath(){
            if(this.sortDt.sort === 'ASC'){                
                return require('./assets/images/sort_asc.png');
            }else if (this.sortDt.sort === 'DESC'){                
                return require('./assets/images/sort_desc.png');
            }
            return null;
        },
    },
}
</script>