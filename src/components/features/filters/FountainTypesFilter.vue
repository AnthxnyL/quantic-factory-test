<script setup>
import { formatFountainType } from '@/utils/mapping';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  availableTypes: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:modelValue']);

const updateSelection = (event) => {
  const value = event.target.value;
  const isChecked = event.target.checked;
  const currentValue = props.modelValue || [];
  let newValue = [...currentValue];
  
  if (isChecked) {
    if (!newValue.includes(value)) {
      newValue.push(value);
    }
  } else {
    newValue = newValue.filter(item => item !== value);
  }
  
  emit('update:modelValue', newValue);
};
</script>

<template>
  <div>
    <div class="space-y-2 max-h-64 overflow-y-auto">
      <label
        v-for="type in availableTypes"
        :key="type"
        :class="[
          'flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer',
          modelValue.includes(type)
            ? 'bg-primary-50 border-primary-200 text-primary-900'
            : 'bg-white border-gray-200 hover:bg-gray-50'
        ]"
      >
        <input
          type="checkbox"
          :value="type"
          :checked="modelValue.includes(type)"
          @change="updateSelection($event)"
          class="rounded border-gray-300 text-primary-600 focus:ring-primary"
        />
        <span class="text-sm font-sans-light">{{ formatFountainType(type) }}</span>
      </label>
    </div>
  </div>
</template>
