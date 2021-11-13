<template>
    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between">
        <div> {{formatLang.labelInfo1}} {{metaData.from}} {{formatLang.labelInfo2}} {{metaData.to}} {{formatLang.labelInfo3}} {{metaData.total}} {{formatLang.labelInfo4}}</div>
        <nav>
            <ul class="pagination">
                <template v-for="(link, index) in links" :key="index">
                    <li v-if="!link.url" class="page-item disabled" >
                        <a
                            v-if="!link.url"
                            class="page-link"                            
                            v-html="link.label"
                        ></a>
                    </li>

                    <li v-else class="page-item" :class="{'active' : link.active}">
                        <a
                            class="page-link"
                            @click="selectPage(link.url)"
                            href="#"
                            v-html="link.label"
                        ></a>
                    </li>
                </template>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        metaData: Object,
        links: Array,
        language: Object
    },    
    methods: {
        selectPage(url){            

            this.$emit('onChangePage', {
                url,
                isPrevious: this.links[0] ? true : false,
                isNext: this.links[this.links.length - 1] ? true : false,
                isPaginate: (!this.isPrevious && !this.isNext) ? true : false,
            });
        },
        
    },
    computed: {
        formatLang(){
            const labelSplit = this.language.info.split('_FROM_').join(',').split('_TO_').join(',').split('_TOTAL_').join(',').split(',');
            
            return {
                labelInfo1: labelSplit.length > 0 ? labelSplit[0] : null,
                labelInfo2: labelSplit.length > 1 ? labelSplit[1] : null,
                labelInfo3: labelSplit.length > 2 ? labelSplit[2] : null,
                labelInfo4: labelSplit.length > 3 ? labelSplit[3] : null,
            };
        }
    }
}
</script>