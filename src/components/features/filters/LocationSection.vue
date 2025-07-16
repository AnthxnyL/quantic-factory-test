<script setup>
import CollapsibleSection from './CollapsibleSection.vue';
import { ArrondissementFilter } from '.';

defineProps({
  arrondissements: { type: Array, default: () => [] },
  isCollapsed: { type: Boolean, default: true }
});

defineEmits(['update:arrondissements', 'toggle']);
</script>

<template>
  <CollapsibleSection
    title="Localisation"
    icon="📍"
    :isCollapsed="isCollapsed"
    :activeCount="arrondissements.length"
    @toggle="$emit('toggle')"
  >
    <ArrondissementFilter 
      :modelValue="arrondissements" 
      @update:modelValue="$emit('update:arrondissements', $event)" 
    />
  </CollapsibleSection>
</template>
