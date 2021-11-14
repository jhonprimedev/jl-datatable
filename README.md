<h1 align="center">JL Datatable</h1>

<p align="center">A datatable server side mode for vuejs ⚙️</p>


![capture](https://user-images.githubusercontent.com/29264001/141651144-c1f7c920-e36c-4b0e-9c13-448ef603c92d.png)


It was made for `vuejs 3` and to work with `laravel 8`, however it can work with other backend programming languages, as long as the json format returned by the server is respected.

## 🚀 There is an online demo:
### DEMO 👉 [Online](https://xenodochial-turing-7457ba.netlify.app)

### Front End  👉 [Repository Github](https://github.com/jhonijlm/vuejs-datatable-app)

### Backend with Laravel 👉 [Repository Github](https://github.com/jhonijlm/laravel-datatable-api)


## Basic usage
```html
<jl-datatable
    :url='http://localhost/api/users'
    :columns="[
        {
            title: 'ID',
            key: 'id'
        },   
        {
            title: 'Name',
            key: 'name' 
        },
        {
            title: 'Last Name',
            key: 'last_name'
        },    
    ]"  
/>
```

## Installing
Install the JlDatatable package:
```sh
npm install jl-datatable
# or
yarn add jl-datatable
```

Register it as you usually would:
```js
import {createApp } from 'vue'
import App from './App.vue'

import JlDatatable from 'jl-datatable'

const app = createApp(App)

app.component('jl-datatable', JlDatatable)

app.mount('#app')
```
### Props - General

Property Name | Type | Required | Default Value | Description
--- | --- | --- | --- | ---
`url` | String | Yes | NULL | URL to get entries.
requestOptions | Object | No | `{method: 'GET'}` | Allows to add more parameters in the request to be made to the server.
`columns` | Array Object | Yes | `[]` | 	An array of objects that specifies how to render each column.
`pageLength` | Integer | No | `10` | Length of records shown in the table.
`lengthMenu` | Array Integer | No | `[10, 20, 50, 100]` | List of lengths for the menu to display in the table.
`isLengthMenu` | Boolean | No | `True` | If true, the menu will be displayed, otherwise it will not be displayed and the props `lengthMenu` and `pageLength`, will change to default.
`IsSearch` | Boolean | No | `True` | If true, the search engine will display.
`sortDt` | Object | No | `{ sortBy: 'firstColumn', 'sort': 'ASC'}` | Sort the records, for sort you have two options of ascending (ASC) and descending (DESC) sorting.
`isSort` | Boolean | No | `True` | If true, ordering is permitted in general.
`language` | Object | No | English | Change displayed texts to another language.


### Prop: `columns`
Property Name | Type | Required | Default Value | Description
--- | --- | --- | --- | ---
`title` | String | Yes | NULL | Is what is shown in the table header.
`key` | String | Yes | NULL | Allows to identify the data to be obtained by means of key and value.
`isSort` | Boolean | No | `True` | If true, sorting is activated for the column.
`isSearch` | Boolean | No | `True` |  If true, the search for the column is activated.
`width` | String | No | NULL | Allows you to set a width size for the column.
`isAction` | Boolean | No | `False` | If true, the option to place a component to the column is enabled.
`component` | Object | No | NULL | Allows you to add a component, e.g. edit and delete buttons. This can only be used if `isAction` is true.


### Prop: `language`
Property Name | Type | Required | Default Value | Description
--- | --- | --- | --- | ---
`lengthMenu` | String | No | Show_MENU_entries | Text to select the number of records to display in the table.
`zeroRecords` | String | No | No data available in table. | Text displayed when no search results are found.
`info` | String | No | Showing_FROM_to_TO_of_TOTAL_entries | Text displayed at lower left.
`search` | String | No | Search | Text displayed on the upper right.


### Events
Name | Return | Description
--- | --- | --- 
`countPageChanged` |  Integer |  Returns the number of records to display in the table.
`search` | String | Returns the text entered in the search, has a delay of 300 ms.
`gettingEntries` | Object | Returns the request to be made to the server.
`entriesFetched` | Object | Returns the request made to the server and the data.
`columnClicked` | Object | Returns this data isSort, sort and column when clicking on a column.
`prevPaginated` | String | Returns the url when the previous button is clicked.
`nextPaginated` | String | Returns the url when clicking on the next button.
`paginated` | String | Returns the url when clicking on any button in the page.
`error` | Object | Returns the error caused by the server after the request has been made.


## License

MIT