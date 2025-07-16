<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: { type: String, required: true }, // 'ouvert', 'ferme', 'nc'
  label: { type: String, required: true }
});

const statusColorClass = computed(() => {
  switch(props.status) {
    case 'ouvert': return 'text-green-600';
    case 'ferme': return 'text-red-600';
    case 'nc': return 'text-gray-400';
    default: return 'text-gray-400';
  }
});

const statusLabel = computed(() => props.label);
</script>


<template>
  <span :class="statusColorClass + ' font-sans-light'">
    ● {{ statusLabel }}
  </span>
</template>


