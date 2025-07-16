<script setup>
import CollapsibleSection from './CollapsibleSection.vue';
import { SpaceTypesFilter } from '.';

defineProps({
  typesEspaces: { type: Array, default: () => [] },
  availableTypes: { type: Array, default: () => [] },
  isCollapsed: { type: Boolean, default: true }
});

defineEmits(['update:typesEspaces', 'toggle']);
</script>

<template>
  <CollapsibleSection
    title="Espaces verts"
    icon="🌳"
    :isCollapsed="isCollapsed"
    :activeCount="typesEspaces.length"
    @toggle="$emit('toggle')"
  >
    <SpaceTypesFilter 
      :modelValue="typesEspaces"
      :available-types="availableTypes"
      @update:modelValue="$emit('update:typesEspaces', $event)"
    />
  </CollapsibleSection>
</template>
