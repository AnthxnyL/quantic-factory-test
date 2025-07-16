<script setup>
import CollapsibleSection from './CollapsibleSection.vue';
import { AccessFilter } from '.';

const props = defineProps({
  payant: { type: String, default: null },
  isCollapsed: { type: Boolean, default: true }
});

defineEmits(['update:payant', 'toggle']);

const getActiveLabel = () => {
  if (props.payant === 'Oui') return 'Payant';
  if (props.payant === 'Non') return 'Gratuit';
  return '';
};

const activeCount = () => props.payant !== null ? 1 : 0;
</script>

<template>
  <CollapsibleSection
    title="Accès"
    icon="💰"
    :isCollapsed="isCollapsed"
    :activeCount="activeCount()"
    @toggle="$emit('toggle')"
  >
    <template v-if="activeCount() > 0" #activeLabel>
      {{ getActiveLabel() }}
    </template>
    <AccessFilter 
      :modelValue="payant"
      @update:modelValue="$emit('update:payant', $event)"
    />
  </CollapsibleSection>
</template>
