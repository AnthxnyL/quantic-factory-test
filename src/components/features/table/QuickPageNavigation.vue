<script setup>
import { ref } from 'vue';

const props = defineProps({
  totalPages: { type: Number, required: true }
});

const emit = defineEmits(['goToPage']);

const pageInput = ref('');

const goToPage = () => {
  const page = parseInt(pageInput.value);
  if (page && page >= 1 && page <= props.totalPages) {
    emit('goToPage', page);
    pageInput.value = '';
  }
};
</script>

<template>
  <div class="flex items-center gap-1 mr-2">
    <input 
      v-model="pageInput"
      @keyup.enter="goToPage"
      type="number" 
      :min="1" 
      :max="totalPages"
      placeholder="Page"
      class="w-16 px-2 py-1 text-sm border rounded"
    >
    <button 
      @click="goToPage"
      class="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
    >
      Aller
    </button>
  </div>
</template>

