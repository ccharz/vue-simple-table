# Vue Simple Table

Basic data table structure component for vue 3 

## Installation

Install the component
`npm install @ccharz/vue-simple-table`


To import type definitions and component use
```js
import {
    TableColumn,
    TableData,
    TableStyling,
    VueSimpleTable,
} from '@ccharz/vue-simple-table';
import '@ccharz/vue-simple-table/dist/style.css';
```


## Example

Look at the example in the sandbox directory

## Props

## Emits

#### Pagination

## Tailwind Styling Example

```js
const tailwindStyling: TableStyling = {
    tableClass: 'w-full text-sm text-left text-gray-500',
    tableHeadClass: 'text-xs text-gray-700 uppercase bg-gray-50',
    rowClass: 'bg-white border-b last:border-0 hover:bg-gray-100 relative',
    headerColumnClass: 'px-6 py-3',
    columnClass: 'px-6 py-4',
    actionColumnClass: 'px-6 py-4 text-right',
    paginationButtonClass:
        'text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded text-sm px-3 py-1.5 disabled:cursor-not-allowed',
    footerContainerClass: 'mt-5 flex justify-center',
};
```



## Commands

`npm run build` Build for production  
`npm run dev` Compile for local dev  
