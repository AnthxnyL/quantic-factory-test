<script setup>
import { FilterTag } from '.';

defineProps({
  filters: { type: Array, required: true }
});

defineEmits(['clearAll']);
</script>



<template>
  <div v-if="filters.length > 0" class="mb-6 p-4 bg-gray-50 rounded-lg border">
    <div class="flex items-center justify-between mb-3">
      <h3 class="font-sans-bold text-gray-700">Filtres actifs ({{ filters.length }})</h3>
      <button 
        @click="$emit('clearAll')"
        class="text-sm text-red-600 hover:text-red-800 font-sans-light flex items-center gap-1"
      >
        <span>✕</span> Effacer tous
      </button>
    </div>
    <div class="flex flex-wrap gap-2">
      <FilterTag
        v-for="filter in filters" 
        :key="`${filter.type}-${filter.value}`"
        :filter="filter"
        @remove="filter.removeAction"
      />
    </div>
  </div>
</template>
