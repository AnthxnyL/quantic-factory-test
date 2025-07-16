<script setup>
defineProps({
  modelValue: { type: String, default: '' }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Ex: parc, fontaine, jeux d'enfants..."
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder-gray-500"
    />
  </div>
</template>
