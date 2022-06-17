<template>
    <tbody>
        <template v-for="(row, index) in rows" :key="index">
            <tr>
                <template v-for="(column, index2) in columns" :key="index2">
                    <template v-if="Object.keys(row).find(data => data === column.data)">
                        <td>{{ row[column.data] }}</td>                        
                    </template>
                    <template v-else-if="column.component">
                        <td>
                            <component                                                                    
                                :is="column.component" 
                                :row="row"
                                :column="column"                                
                            ></component>
                        </td>
                    </template>
                </template>
            </tr>
        </template>
    </tbody>
</template>
<script>
export default {
    name: 'Body',
    props: {
        rows: Array,
        columns: Array
    }
}
</script>