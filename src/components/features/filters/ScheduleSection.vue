<script setup>
import CollapsibleSection from './CollapsibleSection.vue';
import { DayFilter } from '.';

const props = defineProps({
  jourVisite: { type: String, default: '' },
  isCollapsed: { type: Boolean, default: true }
});

defineEmits(['update:jourVisite', 'toggle']);

const getActiveLabel = () => {
  return props.jourVisite ? 
    props.jourVisite.charAt(0).toUpperCase() + props.jourVisite.slice(1) : 
    '';
};

const activeCount = () => props.jourVisite ? 1 : 0;
</script>

<template>
  <CollapsibleSection
    title="Jour de visite"
    icon="📅"
    :isCollapsed="isCollapsed"
    :activeCount="activeCount()"
    @toggle="$emit('toggle')"
  >
    <template v-if="activeCount() > 0" #activeLabel>
      {{ getActiveLabel() }}
    </template>
    <DayFilter 
      :modelValue="jourVisite"
      @update:modelValue="$emit('update:jourVisite', $event)"
    />
  </CollapsibleSection>
</template>
