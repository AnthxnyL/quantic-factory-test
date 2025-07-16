<script setup>
import { computed } from 'vue';
import StatusIndicator from './StatusIndicator.vue';
import { formatFountainType, formatDisplayType } from '@/utils/mapping';

const props = defineProps({
  location: {
    type: Object,
    required: true
  },
  locationStatus: {
    type: Object,
    required: true
  },
  showAccessColumn: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['openSchedule']);

// Computed properties
const formattedType = computed(() => {
  const type = props.location.type || props.location.type_objet || '';
  if (!type) return '—';
  
  // Détecter le type de source et les variantes de fontaines
  if (props.location.source === 'fontaines' || 
      type.toLowerCase().includes('fontaine') ||
      type.toLowerCase().includes('ftne') ||
      type.toLowerCase().includes('fontne') ||
      type.toLowerCase().includes('wallace') ||
      type.toLowerCase().includes('poing eau')) {
    return formatFountainType(type);
  }
  
  return formatDisplayType(type, props.location.source);
});

const mapsUrl = computed(() => {
  if (!props.location.adresse) return '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.location.adresse + ' Paris')}`;
});

// Méthodes
const formatAccessType = (payant) => {
  if (payant === 'Oui') return 'Payant';
  if (payant === 'Non') return 'Gratuit';
  return 'N.C.';
};
</script>

<template>
  <tr class="border-b hover:bg-gray-50">
    <td class="p-2">
      <StatusIndicator 
        :status="locationStatus.status"
        :label="locationStatus.label"
      />
    </td>
    <td class="p-2 font-sans-light">{{ location.nom || location.modele || '—' }}</td>
    <td class="p-2 font-sans-light">{{ formattedType }}</td>
    <td class="p-2 font-sans-light">{{ location.arrondissement || '—' }}</td>
    <td class="p-2 font-sans-light">{{ location.adresse || '—' }}</td>
    <td v-if="showAccessColumn" class="p-2 font-sans-light">
      {{ formatAccessType(location.payant) }}
    </td>
    <td class="p-2">
      <button 
        @click="$emit('openSchedule', location)" 
        class="text-primary-600 font-sans-bold hover:underline bg-primary-100 px-2 py-1 rounded"
      >
        🛈 Voir horaires
      </button>
    </td>
    <td class="p-2 font-sans-light">
      <a v-if="location.adresse"
         :href="mapsUrl"
         target="_blank"
         rel="noopener noreferrer"
         class="text-primary hover:text-primary-800">
        📍 Voir
      </a>
    </td>
  </tr>
</template>
