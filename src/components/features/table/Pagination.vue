<script setup>
import { computed } from 'vue';
import QuickPageNavigation from './QuickPageNavigation.vue';

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  totalItems: { type: Number, required: true },
  itemsPerPage: { type: Number, required: true },
  isLargeDataset: { type: Boolean, default: false },
  isVeryLargeDataset: { type: Boolean, default: false },
  performanceInfo: { type: String, default: null }
});

const emit = defineEmits(['goToPage', 'update:itemsPerPage']);

const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1);
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems));

const visiblePages = computed(() => {
  const pages = [];
  const total = props.totalPages;
  const current = props.currentPage;
  
  if (total <= 1) return [];
  
  // Si 7 pages ou moins, afficher toutes
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  // Pagination intelligente pour plus de 7 pages
  pages.push(1);
  
  if (current > 4) {
    pages.push('...');
  }
  
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  
  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i);
    }
  }
  
  if (current < total - 3) {
    pages.push('...');
  }
  
  if (total > 1) {
    pages.push(total);
  }
  
  return pages;
});

const buttonClasses = (disabled) => [
  'px-3 py-1 rounded text-sm font-sans-light transition-colors',
  disabled 
    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
    : 'bg-primary-500 text-white hover:bg-primary-600'
];

const pageButtonClasses = (isActive) => [
  'px-3 py-1 rounded text-sm font-sans-light min-w-[2.5rem] transition-colors',
  isActive 
    ? 'bg-primary-600 text-white' 
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
];
</script>


<template>
  <div v-if="totalPages > 1" class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <!-- Info pagination et taille de page -->
    <div class="flex items-center gap-4">
      <span class="text-sm text-gray-600">
        {{ startItem }} - {{ endItem }} sur {{ totalItems }}
      </span>
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">Afficher:</label>
        <select 
          :value="itemsPerPage" 
          @change="$emit('update:itemsPerPage', Number($event.target.value))"
          class="border rounded px-2 py-1 text-sm font-sans-light"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option v-if="isVeryLargeDataset" value="200">200</option>
          <option v-if="isVeryLargeDataset" value="500">500</option>
        </select>
        <span class="text-sm text-gray-600">par page</span>
        <span v-if="performanceInfo" class="text-xs text-primary-600 ml-2">
          📊 {{ performanceInfo }}
        </span>
      </div>
    </div>
    
    <!-- Navigation pages -->
    <div class="flex items-center gap-2">
      <QuickPageNavigation 
        v-if="isLargeDataset"
        :totalPages="totalPages"
        @goToPage="$emit('goToPage', $event)"
      />

      <div class="flex items-center gap-1">
        <button 
          @click="$emit('goToPage', currentPage - 1)"
          :disabled="currentPage === 1"
          :class="buttonClasses(currentPage === 1)"
        >
          <span class="sm:hidden">←</span>
          <span class="hidden sm:inline">← Précédent</span>
        </button>

        <template v-for="page in visiblePages" :key="page">
          <button 
            v-if="page !== '...'"
            @click="$emit('goToPage', page)"
            :class="pageButtonClasses(page === currentPage)"
          >
            {{ page }}
          </button>
          <span v-else class="px-2 text-gray-400">...</span>
        </template>

        <button 
          @click="$emit('goToPage', currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="buttonClasses(currentPage === totalPages)"
        >
          <span class="sm:hidden">→</span>
          <span class="hidden sm:inline">Suivant →</span>
        </button>
      </div>
    </div>
  </div>
</template>
