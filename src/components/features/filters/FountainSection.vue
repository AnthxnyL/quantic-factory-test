<script setup>
import CollapsibleSection from './CollapsibleSection.vue';
import { FountainTypesFilter } from '.';

defineProps({
  typesFontaines: { type: Array, default: () => [] },
  availableTypes: { type: Array, default: () => [] },
  isCollapsed: { type: Boolean, default: true }
});

defineEmits(['update:typesFontaines', 'toggle']);
</script>

<template>
  <CollapsibleSection
    title="Fontaines"
    icon="⛲"
    :isCollapsed="isCollapsed"
    :activeCount="typesFontaines.length"
    @toggle="$emit('toggle')"
  >
    <FountainTypesFilter 
      :modelValue="typesFontaines"
      :available-types="availableTypes"
      @update:modelValue="$emit('update:typesFontaines', $event)"
    />
  </CollapsibleSection>
</template>
