<script setup>
import DataCard from './DataCard.vue';

defineProps({
  data: { type: Array, required: true },
  showAccessColumn: { type: Boolean, default: false },
  getLocationStatus: { type: Function, required: true }
});

defineEmits(['openSchedule']);
</script>

<template>
  <div class="grid gap-4">
    <DataCard
      v-for="location in data"
      :key="location.id || location.object_id"
      :location="location"
      :showAccessColumn="showAccessColumn"
      :getLocationStatus="getLocationStatus"
      @openSchedule="$emit('openSchedule', $event)"
    />
  </div>
</template>
