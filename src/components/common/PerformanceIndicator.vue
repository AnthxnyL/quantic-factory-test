<script setup>
defineProps({
  dataLength: { type: Number, required: true },
  threshold: { type: Number, default: 10000 }
});
</script>

<template>
  <div 
    v-if="dataLength > threshold" 
    class="mb-4 lg:mb-6"
  >
    <div class="bg-orange-50 border border-orange-200 rounded-lg p-3 lg:p-4">
      <div class="flex items-center gap-2 text-orange-700">
        <span class="text-lg">⚡</span>
        <span class="text-sm lg:text-base font-sans-bold">
          Gros volume de données détecté
        </span>
      </div>
      <p class="text-xs lg:text-sm text-orange-600 mt-1 font-sans-light">
        Pagination automatiquement optimisée pour de meilleures performances
      </p>
    </div>
  </div>
</template>
