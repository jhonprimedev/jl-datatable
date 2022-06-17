<template>
    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div class="row">
            <div class="col-auto">
                <label for="inputSearch">Show</label>
            </div>
            <div class="col-auto">
                <select class="form-select form-select-sm" v-model="length" @change="updatedMenu()" >
                    <option v-for="menu in lengthMenu" :key="menu" :value="menu">{{ menu }}</option>
                </select>
            </div>
            <div class="col-auto">
                <label for="inputSearch" class="col-form-label">Entries</label>
            </div>
        </div>
        <div class="row">
            <div class="col-auto">
                <label class="col-form-label">Search</label>
            </div>
            <div class="col-auto">
                <input type="search" class="form-control form-control-sm" v-model="search" @input="updatedSearch()" />
            </div>
        </div>
    </div>
</template>
<script>
import debounce from 'lodash/debounce';
import {ref} from 'vue';
export default {
    name: 'Header',
    props: {
        length: {
            type: Number,
            default: 10
        },
        lengthMenu: Array
    },
    emits: ['onUpdatedMenu', 'onUpdatedSearch'],
    setup(props, { emit }){
        const search = ref('');

        const updatedMenu = () => {
            emit('onUpdatedMenu', props.length);
        }

        const updatedSearch = debounce(function() {            
            emit('onUpdatedSearch', search);
        }, 500);

        return { search, updatedMenu, updatedSearch }
    }
    
}
</script>