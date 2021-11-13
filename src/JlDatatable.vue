<template>
  <div>
    <Header 
      :lengthMenu="lengthMenu"
      :isLengthMenu="isLengthMenu"
      :menu="menu"
      :isSearch="isSearch"
      :language="lang"
      @onChangeMenu="setMenu"
      @onSearch="setSearch"
    />
    <div class="row">
      <Table
        :columns="columns"
        :data="data"
        :isSort="isSort"
        :sortDt="{
          sortBy: sortBy,
          sort: sort
        }"
        :language="lang"
        :isLoading="isLoading"
        @onChangeSort="setSort"
      /> 
      <Footer
        :metaData="metaData"
        :links="links"
        :language="lang"
        @onChangePage="setPage"
      /> 
    </div>   
  </div>       
</template>




<script>

import Header from './Header.vue';
import Footer from './Footer.vue';
import Table from './Table.vue';

export default {
  name:'JlDatatable',  
  emits: [
    'error', 
    'countPageChanged', 
    'search', 
    'gettingEntries', 
    'entriesFetched', 
    'columnClicked',
    'prevPaginated',
    'nextPaginated',
    'paginated'
    ],
  props: {
    url: {
      // required: true,
      type: String,     
      validator(value) {

        if(value === undefined){
          throw Error('The url is required.');  
        }

        let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

        const isUrl = !!pattern.test(value)
        if(!isUrl){
          throw Error('The url is invalid.');  
        }
      }
    },
    requestOptions: {
      type: Object,
      default: () => {
        return {
          method: 'GET'
        }
      },
    },
    columns: {
      // required: true,
      type: Array,
      validator(value){
        if(value.length > 0){
          for(const column of value){
              if(!(typeof column === 'object')){              
                  throw Error('The column is not an object.');            
              }       
              
              if(column.key === undefined){
                throw Error('The key property of columns, is required.');              
              }            
  
              if(!(typeof column.key === 'string')){
                  throw Error('The key property of columns, is not string.');
              }
  
              if(column.title === undefined){              
                  throw Error('The title property of columns, is required.');
              }
  
              if(!(typeof column.title === 'string')){
                  throw Error('The title property of columns, is not string.');
              }
  
              if(!(column.isSort === true || column.isSort === false || column.isSort === undefined)){
                  throw Error('The isSort property of columns, is not boolean.');            
              }
  
              if(!(typeof column.width === 'string' ||  column.width === undefined)){
                  throw Error('The width property of columns, is not string.');
              }
  
              if(!(column.isSearch === true || column.isSearch === false || column.isSearch === undefined)){
                  throw Error('The isSearch property of columns, is not boolean.');            
              }
  
              if(!(column.isAction === true || column.isAction === false || column.isAction === undefined)){
                  throw Error('The isAction property of columns, is not boolean.');            
              }
          }

        }else{
          throw Error('Has no assigned columns.');            
        }
      }
    },
    lengthMenu: {
      type: Array,
      default: () =>  [10, 20, 50, 100],
      validator(value){        
        for(const menu of value){          
          if(!Number.isInteger(menu)){
            throw Error('The menu is not a whole number.');
          }
        }
      }
    },
    isLengthMenu: {
      type: Boolean,
      default: true,
    },
    pageLength: {
      type: Number,
      default: () => 10,
      validator(value){
        if(!Number.isInteger(value)){
          throw Error('The pageLength is not a whole number.');
        }
      }
    },
    isSearch: {
      type: Boolean,
      default: true      
    },    
    isSort: {
      type: Boolean,
      default: true      
    },
    sortDt: {
      type: Object,
    },
    language: {
      type: Object,
      default: () => {
        return {
          lengthMenu: null,
          info: null,
          zeroRecords: null,
          // loading: 'Loading',
          search: null
        }
      },
    }
  },
  components: {
    Header,
    Table,
    Footer
  },
  data() {
    return {
      urlBase: this.url,
      menu: this.pageConfig(),
      search: '',      
      sortBy: this.orderConfig().sortBy,
      sort: this.orderConfig().sort,
      isLoading: false,
      data: [],
      links: [],
      metaData: {
        from: 0,
        to: 0,
        total: 0
      },
      lang: {
          lengthMenu: this.language.lengthMenu ? this.language.lengthMenu : 'Show_MENU_entries',
          info: this.language.info ? this.language.info : 'Showing_FROM_to_TO_of_TOTAL_entries',
          zeroRecords: this.language.zeroRecords ? this.language.zeroRecords : 'No data available in table.',
          // loading: 'Loading',
          search: this.language.search ? this.language.search : 'Search'
      }
    }
  },
  mounted() {
    this.getEntries();
  },
  methods: {
    async getEntries(){
      if (this.urlBase) {      
        const urlFull = new URL(this.urlBase);

        const parameters = new Map() ;
        const paramPage = urlFull.searchParams.get("page");        
        parameters.set('page', paramPage ? paramPage : 1);
        parameters.set('pageLength', this.menu);
        parameters.set('sortBy', this.sortBy);
        parameters.set('sortColumns', this.columns.map(column => ((column.isAction === false || column.isAction === undefined) && (column.isSort === true || column.isSort === undefined)) ? column.key : "").filter(txt => txt != "").join(','));
        parameters.set('sort', this.sort);
        parameters.set('search', this.search);        
        parameters.set('searchColumns', this.columns.map(column => ((column.isAction === false || column.isAction === undefined) && (column.isSearch === true || column.isSearch === undefined)) ? column.key : "").filter(txt => txt != "").join(','));

        urlFull.search = new URLSearchParams(parameters).toString();        
        const request = new Request(urlFull, this.requestOptions);      
        
        
        this.$emit('gettingEntries', request);

        const reqPromise = fetch(request);
        
        this.isLoading = true;
        const response = await reqPromise;
        if(response.ok){
          const data = await response.json() ;
          
          this.$emit('entriesFetched', {request, data});
          this.data = data.data;
          this.metaData.from = data.from ? data.from : 0;
          this.metaData.to = data.to ? data.to : 0;
          this.metaData.total = data.total ? data.total : 0;
          this.links = data.links;
          this.isLoading = false;
        }else{
          this.$emit('error', {
              type: 'entries',
              message: 'Get entries fail',
              context: {
                request,
                reqPromise,
              },
          });
        }
      }

    },
    setPage(data){      
      this.urlBase = data.url;

      if(data.isPrev){
          this.$emit('prevPaginated', data.url);
      }else if(data.isNext){
          this.$emit('nextPaginated', data.url);
      }else {
          this.$emit('paginated', data.url);
      }

      this.getEntries();
    },
    setMenu(menu){    
      this.menu = menu;   
      this.$emit('countPageChanged', this.menu);
      const page2 = (this.metaData.to / menu).toFixed(0);
      this.urlBase = `${this.url}?page=${page2}`; // init
      this.getEntries();
    },
    setSearch(search){          
      this.urlBase = this.url; // init
      this.search = search;      
      this.$emit('search', this.search);
      this.getEntries();
    },
    setSort(data){    
      this.$emit('columnClicked', data);
      if(data.isSort){
        this.sortBy = data.sort.sortBy;
        this.sort = data.sort.sort;

        this.getEntries();
      }
    },
    orderConfig(){
      if(this.isSort){
        if(typeof this.sortDt === 'object'){          
          if(this.sortDt.sortBy !== undefined || this.sortDt.sortBy !== ''){            
            if(this.columns.find(clm => clm.key === this.sortDt.sortBy && (clm.isSort === true || clm.isSort === undefined) && (clm.isAction === false ||  clm.isAction === undefined) )){
              return {
                sortBy: this.sortDt.sortBy,
                sort: ['ASC', 'DESC'].includes(this.sortDt.sort) ? this.sortDt.sort : 'ASC'
              }
            }else{
              throw Error('The column to be sorted, isSort is disabled or does not exist in the columns.');
            }
          }else{
            return {
              sortBy: this.columns[0].key,
              sort: 'ASC'
            }
          }
          
        }else{
          return {
            sortBy: this.columns[0].key,
            sort: 'ASC'
          }
        }
      }else{
        return {
            sortBy: '',
            sort: ''
          }
      }
    },
    pageConfig(){
      if(this.lengthMenu.length > 0){
        if(!this.isLengthMenu){
          return 10;
        }else{
          if(this.lengthMenu.includes(this.pageLength)){
            return this.pageLength;
          }else{
            return this.lengthMenu[0];
          }

        }
        
      }else{
          throw Error('The lengthMenu has no elements.');
      }
    }
  }
}
</script>


