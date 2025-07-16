<script setup>
defineProps({
  title: { type: String, required: true },
  isCollapsed: { type: Boolean, default: false },
  activeCount: { type: Number, default: 0 },
  icon: { type: String, default: '📋' }
});

defineEmits(['toggle']);
</script>

<template>
  <div class="border border-gray-200 rounded-lg">
    <button 
      @click="$emit('toggle')"
      class="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
    >
      <div class="flex items-center gap-3">
        <span class="text-lg">{{ icon }}</span>
        <h3 class="font-sans-bold text-gray-900">{{ title }}</h3>
        <span v-if="activeCount > 0" class="text-xs bg-primary-100 text-primary-600 px-2 py-1 rounded-full">
          {{ activeCount }}
        </span>
      </div>
      <svg 
        :class="['w-5 h-5 text-gray-500 transition-transform', isCollapsed ? 'rotate-180' : '']"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    <div v-show="!isCollapsed" class="px-4 pb-4">
      <slot />
    </div>
  </div>
</template>
