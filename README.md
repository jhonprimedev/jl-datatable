<h1 align="center">JL Datatable</h1>

<p align="center"><strong>A datatable server side rendering mode made with Vue JS 3</strong> ⚙️</p>


![capture](https://user-images.githubusercontent.com/29264001/141651144-c1f7c920-e36c-4b0e-9c13-448ef603c92d.png)


## 🚀 There is an online demo:

### Front End  👉 [Repository Github](https://github.com/jhonijlm/vuejs-datatable-app)

### Backend with Laravel 👉 [Repository Github](https://github.com/jhonijlm/laravel-datatable-api)


## Basic usage
```html
<jl-datatable
    :url='http://localhost/api/users'
    :columns="[
        {
            label: 'ID',
            data: 'id'
        },   
        {
            label: 'Name',
            data: 'name' 
        },
        {
            label: 'Last Name',
            data: 'last_name'
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
`requestOptions` | Object | No | `{method: 'GET'}` | Allows to add more parameters in the request to be made to the server.
`columns` | Array Object | Yes | `[]` | 	An array of objects that specifies how to render each column.
`pageLength` | Integer | No | `10` | Length of records shown in the table.
`lengthMenu` | Array Integer | No | `[10, 25, 50, 100]` | List of lengths for the menu to display in the table.
`order` | Object | No | `{ column: 0, dir: 'ASC'}` | Sort the records, for sort you have two options of ascending (ASC) and descending (DESC) sorting.
`reset` | String | No | NULL | Reset the data from the datatable. Only a random string different from the previous one should be sent.


### Prop: `columns`
Property Name | Type | Required | Default Value | Description
--- | --- | --- | --- | ---
`label` | String | Yes | NULL | Is what is shown in the table header.
`data` | String | Yes | NULL | Allows to identify the data to be obtained by means of key and value.
`orderable` | Boolean | No | `True` | If true, sorting is activated for the column.
`searchable` | Boolean | No | `True` |  If true, the search for the column is activated.
`component` | Object | No | NULL | Allows you to add a component, e.g. edit and delete buttons.

### Events
Name | Return | Description
--- | --- | --- 
`gettingEntries` | Object | Returns the request to be made to the server.
`entriesFetched` | Object | Returns the request made to the server and the data.
## License

MIT