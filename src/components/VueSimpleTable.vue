<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from 'vue';
import VueSimpleTablePagination from './VueSimpleTablePagination.vue';
import { TableColumn, TableData, TableStyling, PaginationTarget } from '..';

const props = withDefaults(
    defineProps<{
        data: TableData<T>;
        columns: TableColumn<T>[];
        pagination?: { window?: number };
        styling?: TableStyling;
        sortedBy?: string[] | null;
    }>(),
    {},
);

const emit = defineEmits<{
    (e: 'rowClick', row: T, index: number): void;
    (e: 'sort', field: string, column: TableColumn<T>): void;
    (e: 'pagination', target: PaginationTarget): void;
}>();

const computedData = computed<Array<T>>(() =>
    props.data.data.map((row: T) => ({
        ...row,
        ...props.columns.reduce((obj, column: TableColumn<T>) => {
            return {
                ...obj,
                [column.id]: column.value ? column.value(row) : row[column.id],
            };
        }, {}),
    })),
);

function sortByColumn(column: TableColumn<T>): void {
    if (column.sort && !props.sortedBy?.includes(column.sort)) {
        emit('sort', column.sort, column);
    } else if (column.sort && props.sortedBy?.includes(column.sort)) {
        emit('sort', '-' + column.sort, column);
    }
}
</script>

<template>
    <div class="vue-simple-table" :class="props.styling?.tableContainerClass">
        <table :class="props.styling?.tableClass">
            <thead :class="props.styling?.tableHeadClass">
                <tr>
                    <th
                        v-for="column in props.columns"
                        scope="col"
                        :class="
                            column.headerClass ||
                            props.styling?.headerColumnClass
                        "
                    >
                        <slot
                            :name="`header-column(${column.id})`"
                            :column="column"
                        >
                            <span v-if="!column.sort">
                                {{ column.label }}
                            </span>
                            <button
                                v-else
                                type="button"
                                class="sort"
                                :class="{
                                    sortable: !!column.sort,
                                    'sort-asc':
                                        column.sort &&
                                        props.sortedBy?.includes(
                                            '-' + column.sort,
                                        ),
                                    'sort-desc':
                                        column.sort &&
                                        props.sortedBy?.includes(column.sort),
                                }"
                                @click="sortByColumn(column)"
                            >
                                <span>
                                    {{ column.label }}
                                </span>

                                <template v-if="column.sort">
                                    <slot
                                        v-if="
                                            props.sortedBy?.includes(
                                                '-' + column.sort,
                                            )
                                        "
                                        name="sortAsc"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M7 11l5-5m0 0l5 5m-5-5v12"
                                            />
                                        </svg>
                                    </slot>

                                    <slot
                                        v-else-if="
                                            props.sortedBy?.includes(
                                                column.sort,
                                            )
                                        "
                                        name="sortDesc"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M17 13l-5 5m0 0l-5-5m5 5V6"
                                            />
                                        </svg>
                                    </slot>

                                    <slot v-else name="sort">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                            />
                                        </svg>
                                    </slot>
                                </template>
                            </button>
                        </slot>
                    </th>
                    <th v-if="!!$slots['row-action']">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in computedData"
                    :class="props.styling?.rowClass"
                    @click="emit('rowClick', row, rowIndex)"
                >
                    <td
                        v-for="column in props.columns"
                        :class="
                            column.columnClass || props.styling?.columnClass
                        "
                    >
                        <slot
                            :name="`column(${column.id})`"
                            :row="props.data.data[rowIndex]"
                        >
                            {{ row[column.id] }}
                        </slot>
                    </td>

                    <td
                        v-if="!!$slots['row-action']"
                        :class="props.styling?.actionColumnClass"
                    >
                        <slot
                            name="row-action"
                            :row="props.data.data[rowIndex]"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
        <slot name="footer">
            <div
                class="footer-container"
                :class="props.styling?.footerContainerClass"
            >
                <VueSimpleTablePagination
                    v-if="props.pagination"
                    :data="props.data"
                    :styling="props.styling"
                    :window="props.pagination.window"
                    @pagination="emit('pagination', $event)"
                >
                    <template v-for="(_, slot) in $slots" v-slot:[slot]>
                        <slot
                            v-if="
                                typeof slot === 'string' &&
                                slot.indexOf('pagination') >= 0
                            "
                            :name="slot"
                        />
                    </template>
                </VueSimpleTablePagination>
            </div>
        </slot>
    </div>
</template>
