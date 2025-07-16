<script setup>
import { SearchFilter } from '.';

defineProps({
  search: { type: String, default: '' }
});

defineEmits(['update:search']);
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center gap-3">
      <span class="text-lg">🔍</span>
      <h3 class="font-sans-bold text-gray-900">Recherche libre</h3>
    </div>
    <SearchFilter :modelValue="search" @update:modelValue="$emit('update:search', $event)" />
  </div>
</template>
