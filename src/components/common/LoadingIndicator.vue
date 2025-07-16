<script setup>
defineProps({
  isLoading: { type: Boolean, default: false },
  isInitialized: { type: Boolean, default: false }
});
</script>

<template>
  <div v-if="isLoading" class="flex flex-col items-center justify-center py-12 lg:py-16">
    <div class="bg-white rounded-lg shadow-lg p-6 lg:p-8 max-w-md mx-auto">
      <div class="flex items-center justify-center gap-4 mb-4">
        <div class="animate-spin w-8 h-8 lg:w-10 lg:h-10 border-4 border-primary-500 border-t-transparent rounded-full"></div>
        <span class="text-lg lg:text-xl text-gray-700 font-sans-light">
          {{ !isInitialized ? 'Chargement...' : 'Mise à jour...' }}
        </span>
      </div>
      <div class="text-sm lg:text-base text-gray-500 text-center font-sans-light">
        {{ !isInitialized ? 'Récupération des lieux frais parisiens' : 'Application des filtres' }}
      </div>
    </div>
  </div>
</template>
