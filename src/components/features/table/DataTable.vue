<script setup>
import TableHeader from './TableHeader.vue';
import TableBody from './TableBody.vue';

defineProps({
  data: {
    type: Array,
    required: true
  },
  jourVisite: {
    type: String,
    default: ''
  },
  currentDay: {
    type: String,
    required: true
  },
  timeDisplay: {
    type: String,
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
  <div class="overflow-x-auto relative">
    <table class="w-full text-left border">
      <TableHeader
        :jour-visite="jourVisite"
        :current-day="currentDay"
        :time-display="timeDisplay"
        :show-access-column="showAccessColumn"
      />
      <TableBody
        :data="data"
        :show-access-column="showAccessColumn"
        :get-location-status="getLocationStatus"
        @open-schedule="$emit('openSchedule', $event)"
      />
    </table>
  </div>
</template>

