<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from 'vue';
import VueSimpleTablePagination from './VueSimpleTablePagination.vue';
import { TableColumn, TableData, TableStyling } from '..';

export interface Props {
    data: TableData<any>;
    columns: TableColumn<any>[];
    pagination?: { window: number };
    styling?: TableStyling;
    sortedBy?: string[];
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
    (e: 'sort', field: string): void;
    (
        e: 'pagination',
        target: 'first' | 'last' | 'next' | 'prev' | number,
    ): void;
}>();

const computedData = computed<Array<any>>(() =>
    props.data.data.map((row: any) => ({
        ...row,
        ...props.columns.reduce((obj, column: TableColumn<any>) => {
            return {
                ...obj,
                [column.id]: column.value ? column.value(row) : row[column.id],
            };
        }, {}),
    })),
);
</script>

<template>
    <div class="vue-simple-table">
        <table class="vue-simple-table" :class="props.styling?.tableClass">
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
                        <div>
                            <slot
                                :name="`header-column(${column.id})`"
                                :column="column"
                            >
                                <span>
                                    {{ column.label }}
                                </span>
                            </slot>

                            <template v-if="column.sort">
                                <button
                                    v-if="
                                        props.sortedBy?.includes(
                                            '-' + column.sort,
                                        )
                                    "
                                    type="button"
                                    class="sort sort-asc"
                                    @click="emit('sort', column.sort)"
                                >
                                    <slot name="sortAsc">
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
                                </button>
                                <button
                                    v-else-if="
                                        props.sortedBy?.includes(column.sort)
                                    "
                                    type="button"
                                    class="sort sort-desc"
                                    @click="emit('sort', '-' + column.sort)"
                                >
                                    <slot name="sortDesc">
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
                                </button>
                                <button
                                    v-else
                                    type="button"
                                    class="sort"
                                    @click="emit('sort', column.sort)"
                                >
                                    <slot name="sort">
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
                                </button>
                            </template>
                        </div>
                    </th>
                    <th v-if="!!$slots['row-action']">&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="row in computedData"
                    :class="props.styling?.rowClass"
                >
                    <td
                        v-for="column in props.columns"
                        :class="
                            column.columnClass || props.styling?.columnClass
                        "
                    >
                        <slot :name="`column(${column.id})`" :row="row">
                            {{ row[column.id] }}
                        </slot>
                    </td>

                    <td
                        v-if="!!$slots['row-action']"
                        :class="props.styling?.actionColumnClass"
                    >
                        <slot name="row-action" :row="row" />
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
