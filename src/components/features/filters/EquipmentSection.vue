<script setup>
import CollapsibleSection from './CollapsibleSection.vue';
import { EquipmentTypesFilter } from '.';

defineProps({
  typesEquipements: { type: Array, default: () => [] },
  availableTypes: { type: Array, default: () => [] },
  isCollapsed: { type: Boolean, default: true }
});

defineEmits(['update:typesEquipements', 'toggle']);
</script>

<template>
  <CollapsibleSection
    title="Équipements & Activités"
    icon="🏃"
    :isCollapsed="isCollapsed"
    :activeCount="typesEquipements.length"
    @toggle="$emit('toggle')"
  >
    <EquipmentTypesFilter 
      :modelValue="typesEquipements"
      :available-types="availableTypes"
      @update:modelValue="$emit('update:typesEquipements', $event)"
    />
  </CollapsibleSection>
</template>
