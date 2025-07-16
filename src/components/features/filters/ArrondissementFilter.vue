<script setup>
const props = defineProps({
  modelValue: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:modelValue']);

const updateSelection = (event) => {
  const value = event.target.value;
  const isChecked = event.target.checked;
  let newValue = [...props.modelValue];
  
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
    <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-10 gap-2">
      <label 
        v-for="n in 20" 
        :key="n" 
        :class="[
          'flex items-center justify-center gap-2 p-2 rounded-lg border transition-all cursor-pointer',
          modelValue.includes('750' + (n < 10 ? '0' + n : n))
            ? 'bg-primary-100 border-primary-300 text-primary-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
        ]"
      >
        <input
          type="checkbox"
          :value="'750' + (n < 10 ? '0' + n : n)"
          :checked="modelValue.includes('750' + (n < 10 ? '0' + n : n))"
          @change="updateSelection($event)"
          class="sr-only"
        />
        <span class="text-sm font-sans-light">{{ n }}e</span>
      </label>
    </div>
  </div>
</template>
