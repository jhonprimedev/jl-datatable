<template>
    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div v-if="isLengthMenu && lengthMenu.length > 0" class="row"> 
            <div class="col-auto">
                <label for="inputSearch" class="col-form-label">{{formatLang.labelMenu1}}</label>
            </div>            
            <div class="col-auto">
                <select v-model="menuSelect" class="form-select form-select-sm" @change="selectMenu">
                    <option v-for="(menu, index) in lengthMenu" :key="index" :value="menu">{{menu}}</option>
                </select>
            </div>
            <div class="col-auto">
                <label for="inputSearch" class="col-form-label">{{ formatLang.labelMenu2}}</label>
            </div>
        </div>
        <div v-if="isSearch" class="row">
            <div class="col-auto">
                <label class="col-form-label">{{formatLang.labelSearch}}</label>
            </div>
            <div class="col-auto">
                <input v-model.trim="search" type="search" class="form-control form-control-sm" @input="inputSearch" />
            </div>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
export default {
    props: {
        lengthMenu: Array,
        menu: Number,
        isLengthMenu: Boolean,
        isSearch: Boolean,
        language: Object  
    },
    emits: ['onChangeMenu', 'onSearch'],
    data() {
        return {
            menuSelect: this.menu,
            search: '',            
        }
    },
    methods: {
        selectMenu(){            
            this.$emit('onChangeMenu', this.menuSelect);
        },
        inputSearch: debounce(function() {            
            this.$emit('onSearch', this.search);
        }, 300),        
    },    
    computed: {
        formatLang(){
            const labelMenu = this.language.lengthMenu.split('_MENU_');
            const labelSearch = this.language.search;            
            return {
                labelMenu1: labelMenu.length > 0 ? labelMenu[0] : null,
                labelMenu2:labelMenu.length > 1 ? labelMenu[1] : null,
                labelSearch
            };
        }
    }
}
</script>