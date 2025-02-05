<script setup lang="ts">
import { computed } from 'vue';
import { TableData, TableStyling, PaginationTarget } from '..';

export interface PaginationProps {
    data: TableData<any>;
    window?: number;
    styling?: TableStyling;
}

const props = withDefaults(defineProps<PaginationProps>(), {
    showPageWindow: false,
    window: undefined,
});

const emit = defineEmits<{
    (e: 'pagination', target: PaginationTarget): void;
}>();

const range = computed<number[] | undefined>(() =>
    typeof props.window === 'number' &&
    props.data.meta?.current_page &&
    props.data.meta.last_page
        ? [
              Math.max(1, props.data.meta.current_page - props.window),
              Math.min(
                  props.data.meta.last_page,
                  props.data.meta.current_page + props.window,
              ),
          ]
        : undefined,
);
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
        <slot name="page-selection">
            <template v-if="props.data.meta && range">
                <button
                    v-if="range[0] > 1"
                    type="button"
                    class="pagination-number"
                    :class="[
                        props.data.meta.current_page === 1
                            ? props.styling?.activePaginationButtonClass ??
                              'active'
                            : '',
                        props.styling?.paginationButtonClass ?? '',
                    ]"
                    @click="emit('pagination', 1)"
                >
                    1
                </button>

                <button
                    v-if="range[0] > 2"
                    type="button"
                    class="pagination-number"
                    :class="[props.styling?.paginationButtonClass ?? '']"
                    @click="emit('pagination', 1)"
                >
                    ...
                </button>

                <button
                    v-for="page in range[1] - range[0] + 1"
                    type="button"
                    class="pagination-number"
                    :class="[
                        props.data.meta.current_page === range[0] + page - 1
                            ? props.styling?.activePaginationButtonClass ??
                              'active'
                            : '',
                        props.styling?.paginationButtonClass ?? '',
                    ]"
                    @click="emit('pagination', range[0] + page - 1)"
                >
                    {{ range[0] + page - 1 }}
                </button>

                <button
                    v-if="range[1] < props.data.meta.last_page - 1"
                    type="button"
                    class="pagination-number"
                    :class="[props.styling?.paginationButtonClass ?? '']"
                    @click="emit('pagination', props.data.meta.last_page)"
                >
                    ...
                </button>

                <button
                    v-if="range[1] < props.data.meta.last_page"
                    type="button"
                    class="pagination-number"
                    :class="[
                        props.data.meta.current_page ===
                        props.data.meta.last_page
                            ? props.styling?.activePaginationButtonClass ??
                              'active'
                            : '',
                        props.styling?.paginationButtonClass ?? '',
                    ]"
                    @click="emit('pagination', props.data.meta.last_page)"
                >
                    {{ props.data.meta.last_page }}
                </button>
            </template>
        </slot>
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
