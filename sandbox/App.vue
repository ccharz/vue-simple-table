<script setup lang="ts">
import { computed, ref } from 'vue';
import {
    VueSimpleTable,
    VueSimpleTablePagination,
    TableColumn,
    TableData,
    TableStyling,
    PaginationTarget,
} from '../src/index';
import '../src/style.css';

interface ExampleRow {
    active: boolean;
    prename: string;
    surname: string;
    age: number;
}

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
    activePaginationButtonClass:
        'cursor-auto text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-bold rounded text-sm px-3 py-1.5 disabled:cursor-not-allowed',
};

const messageTimeout = ref<ReturnType<typeof setTimeout> | null>(null);
const message = ref<string | null>(null);
const sortedBy = ref<string[] | null>(null);

const exampleOne = computed(() => ({
    columns: <TableColumn<ExampleRow>[]>[
        {
            id: 'active',
            label: 'Active',
            columnClass: 'text-center w-6 ' + tailwindStyling.columnClass,
            headerClass: 'text-center w-6 ' + tailwindStyling.headerColumnClass,
        },
        {
            id: 'prename',
            label: 'Prename',
        },
        {
            id: 'surname',
            label: 'Surname',
        },
        {
            id: 'name',
            label: 'Full name',
            value: (row) => `${row.prename} ${row.surname}`,
        },
        {
            id: 'age',
            label: 'Age',
            sort: 'age',
            columnClass: 'text-right ' + tailwindStyling.columnClass,
            headerClass: 'text-right ' + tailwindStyling.headerColumnClass,
        },
    ],
    data: <TableData<ExampleRow>>{
        links: {
            first: false,
            last: true,
            next: true,
            prev: true,
        },
        meta: {
            current_page: 3,
            from: 0,
            to: 1,
            total: 3,
            path: '',
            per_page: 1,
            last_page: 10,
        },
        data: [
            {
                active: true,
                prename: 'Max',
                surname: 'Mustermann',
                age: 12,
            },
            {
                active: false,
                prename: 'Wotan',
                surname: 'Mustermann',
                age: 65,
            },
            {
                active: false,
                prename: 'Emanuel',
                surname: 'Muster',
                age: 65,
            },
        ],
    },
}));

function showMessage(value: string): void {
    if (messageTimeout.value) {
        clearTimeout(messageTimeout.value);
    }

    message.value = value;

    messageTimeout.value = setTimeout(() => (message.value = null), 3000);
}

function onPagination(target: PaginationTarget) {
    showMessage('Pagination requested: ' + target);
}

function onRowClick(row, index) {
    showMessage('Clicked on row: ' + index);
}

function onSort(sort, column) {
    showMessage('Clicked on sort: ' + sort);
    sortedBy.value = [sort];
}
</script>
<template>
    <main>
        <h1 class="text-center text-2xl font-bold my-2">Vue Simple Table</h1>
        <div class="px-2 py-4">
            <VueSimpleTable
                :columns="exampleOne.columns"
                :data="exampleOne.data"
                :styling="tailwindStyling"
                :sorted-by="sortedBy"
                :pagination="{ window: 2 }"
                @pagination="onPagination"
                @row-click="onRowClick"
                @sort="onSort"
            >
                <template #header-column(active)="{ column }">
                    <span><i>Header Slot</i> {{ column.label }}</span>
                </template>
                <template #column(active)="{ row }">
                    <svg
                        v-if="row.active"
                        xmlns="http://www.w3.org/2000/svg"
                        class="inline-block h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="inline-block h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </template>
            </VueSimpleTable>
        </div>
        <div
            v-if="message"
            class="bg-gray-200 text-center border p-2 border-black m-1"
        >
            {{ message }}
        </div>

        <div>
            <h2>Pagination only</h2>

            <VueSimpleTablePagination :data="exampleOne.data" />
        </div>
    </main>
</template>
