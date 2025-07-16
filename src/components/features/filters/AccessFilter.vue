<script setup>
defineProps({
  modelValue: { type: [String, null], default: null }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row gap-2">
      <label 
        :class="[
          'flex items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer',
          modelValue === null
            ? 'bg-primary-100 border-primary-300 text-primary-700'
            : 'bg-white border-gray-200 hover:bg-gray-50'
        ]"
      >
        <input 
          type="radio" 
          :value="null" 
          :checked="modelValue === null"
          @change="$emit('update:modelValue', null)"
          class="sr-only"
        />
        <span class="text-sm font-sans-light">Tous</span>
      </label>
      
      <label 
        :class="[
          'flex items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer',
          modelValue === 'Non'
            ? 'bg-primary-50 border-primary-200 text-primary-900'
            : 'bg-white border-gray-200 hover:bg-gray-50'
        ]"
      >
        <input 
          type="radio" 
          value="Non" 
          :checked="modelValue === 'Non'"
          @change="$emit('update:modelValue', 'Non')"
          class="sr-only"
        />
        <span class="text-sm font-sans-light">Gratuit</span>
      </label>
      
      <label 
        :class="[
          'flex items-center justify-center gap-2 p-3 rounded-lg border transition-all cursor-pointer',
          modelValue === 'Oui'
            ? 'bg-primary-50 border-primary-200 text-primary-900'
            : 'bg-white border-gray-200 hover:bg-gray-50'
        ]"
      >
        <input 
          type="radio" 
          value="Oui" 
          :checked="modelValue === 'Oui'"
          @change="$emit('update:modelValue', 'Oui')"
          class="sr-only"
        />
        <span class="text-sm font-sans-light">Payant</span>
      </label>
    </div>
  </div>
</template>
