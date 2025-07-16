<script setup>
defineProps({
  modelValue: { type: String, default: '' }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div>
    <select 
      :value="modelValue" 
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white"
    >
      <option value="">— Tous les jours —</option>
      <option value="lundi">Lundi</option>
      <option value="mardi">Mardi</option>
      <option value="mercredi">Mercredi</option>
      <option value="jeudi">Jeudi</option>
      <option value="vendredi">Vendredi</option>
      <option value="samedi">Samedi</option>
      <option value="dimanche">Dimanche</option>
    </select>
  </div>
</template>
