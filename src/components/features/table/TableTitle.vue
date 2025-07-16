<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  jourVisite: {
    type: String,
    default: ''
  },
  currentDay: {
    type: String,
    required: true
  },
  timeDisplay: {
    type: String,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <h2 class="text-xl font-nexa-heavy text-primary mb-2">
    {{ title }}
    <span v-if="!jourVisite" class="text-sm font-normal text-gray-600">
      ({{ currentDay }} {{ timeDisplay }})
    </span>
    <span v-else class="text-sm font-normal text-gray-600">
      ({{ jourVisite }})
    </span>
    <span class="text-sm font-normal text-gray-500 ml-2">
      {{ totalItems }} résultat{{ totalItems > 1 ? 's' : '' }}
    </span>
  </h2>
</template>

