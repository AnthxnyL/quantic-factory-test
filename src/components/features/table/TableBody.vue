<script setup>
import TableRow from './TableRow.vue';

defineProps({
  data: {
    type: Array,
    required: true
  },
  showAccessColumn: {
    type: Boolean,
    default: false
  },
  getLocationStatus: {
    type: Function,
    required: true
  }
});

defineEmits(['openSchedule']);
</script>

<template>
  <tbody>
    <TableRow
      v-for="(location, index) in data"
      :key="index"
      :location="location"
      :location-status="getLocationStatus(location)"
      :show-access-column="showAccessColumn"
      @open-schedule="$emit('openSchedule', $event)"
    />
  </tbody>
</template>

