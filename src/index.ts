import VueSimpleTable from './components/VueSimpleTable.vue';
import VueSimpleTablePagination from './components/VueSimpleTable.vue';
import './style.css';

export interface TableStyling {
    tableContainerClass?: string;
    tableClass: string;
    tableHeadClass: string;
    rowClass: string;
    headerColumnClass: string;
    columnClass: string;
    actionColumnClass: string;
    paginationButtonClass: string;
    footerContainerClass: string;
}

export interface TableColumn<T> {
    id: string;
    label: string;
    columnClass?: string | string[];
    headerClass?: string | string[];
    value?: (row: T) => string | null;
    sort?: string | null;
}

export interface TableData<T> {
    data: T[];
    links?: {
        first: string | boolean | null;
        last: string | boolean | null;
        prev: string | boolean | null;
        next: string | boolean | null;
    };
    meta?: {
        current_page: number;
        from: number;
        to: number;
        total: number;
        path: string;
        per_page: number;
        last_page: number;
        query?: string;
        filter?: {
            [key: string]: any;
        };
        sort?: string;
    };
}

export { VueSimpleTable, VueSimpleTablePagination };
