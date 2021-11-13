<template>
    <tbody v-if="data.length > 0">
        <!-- <template v-if="isLoading">
            <tr>
                {{language.loading}}                
            </tr>
        </template>
        <template v-else-if="data.length === 0">
            <tr>
                {{language.zeroRecords}}                
            </tr>

        </template> -->
        <template  v-for="(row, index1) in data" :key="index1">
            <tr>
            <template v-for="(column, index2) in columns" :key="index2">   
                <template v-if="Object.keys(row).find(key => key === column.key)">
                    <td v-if="!column.isAction">
                        {{ row[column.key]}}
                    </td> 
                    <template v-else>      
                        <td v-if="typeof column.component ==='object'">
                            <component                                                                    
                                :is="column.component" 
                                :row="row"
                                :column="column"                                
                            ></component>
                        </td>                  
                    </template>                                        
                </template>                
            </template>
            </tr>
        </template>
    </tbody>    
    <tbody v-else-if="!isLoading">
        <tr>
            {{language.zeroRecords}}                
        </tr>
    </tbody>        

</template>

<script>
export default {
    props: {
        columns: {
            required: true,
            type: Array,
        },
        data: Array,
        language: Object,
        isLoading: Boolean
    },
}
</script>