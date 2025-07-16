<script setup>
defineProps({
  filter: { type: Object, required: true }
});

defineEmits(['remove']);
</script>

<template>
  <div class="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm border border-primary-200">
    <span>{{ filter.label }}</span>
    <button 
      @click="$emit('remove')"
      class="hover:bg-primary-200 rounded-full w-4 h-4 flex items-center justify-center text-xs font-sans-bold"
      :title="`Supprimer ${filter.label}`"
    >
      ✕
    </button>
  </div>
</template>
