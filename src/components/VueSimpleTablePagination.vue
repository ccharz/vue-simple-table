<script setup lang="ts">
import { TableData, TableStyling } from '..';

export interface PaginationProps {
    data: TableData<any>;
    styling?: TableStyling;
    window: number | boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {});

const emit = defineEmits<{
    (
        e: 'pagination',
        target: 'first' | 'last' | 'next' | 'prev' | number,
    ): void;
}>();
</script>
<template>
    <div v-if="props.data.links" class="vue-simple-table-pagination">
        <button
            type="button"
            :disabled="!props.data.links?.first"
            class="pagination-first"
            :class="props.styling?.paginationButtonClass"
            @click="emit('pagination', 'first')"
        >
            <slot name="pagination-first">
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
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                </svg>
            </slot>
        </button>
        <button
            type="button"
            :disabled="!props.data.links?.prev"
            class="pagination-prev"
            :class="props.styling?.paginationButtonClass"
            @click="emit('pagination', 'prev')"
        >
            <slot name="pagination-prev">
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
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </slot>
        </button>
        <button
            type="button"
            :disabled="!props.data.links?.next"
            class="pagination-next"
            :class="props.styling?.paginationButtonClass"
            @click="emit('pagination', 'next')"
        >
            <slot name="pagination-next">
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
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </slot>
        </button>
        <button
            type="button"
            :disabled="!props.data.links?.last"
            class="pagination-last"
            :class="props.styling?.paginationButtonClass"
            @click="emit('pagination', 'last')"
        >
            <slot name="pagination-last">
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
                        d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                </svg>
            </slot>
        </button>
    </div>
</template>
