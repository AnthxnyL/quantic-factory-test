<script setup>
import { computed } from 'vue';
import StatusIndicator from './StatusIndicator.vue';
import { formatFountainType, formatDisplayType } from '@/utils/mapping';

const props = defineProps({
  location: { type: Object, required: true },
  showAccessColumn: { type: Boolean, default: false },
  getLocationStatus: { type: Function, required: true }
});

const emit = defineEmits(['openSchedule']);

const locationStatus = computed(() => props.getLocationStatus(props.location));

const formattedType = computed(() => {
  if (props.location.type) {
    return formatFountainType(props.location.type);
  }
  if (props.location.type_equipement) {
    return formatDisplayType(props.location.type_equipement);
  }
  if (props.location.sous_type) {
    return props.location.sous_type;
  }
  return '—';
});

const formatAccessType = (payant) => {
  if (payant === 'Oui') return 'Payant';
  if (payant === 'Non') return 'Gratuit';
  return '—';
};

const mapsUrl = computed(() => {
  if (!props.location.adresse) return '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.location.adresse)}`;
});
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow size-card-mobile">
    <!-- En-tête avec statut et nom -->
    <div class="flex items-start justify-between gap-3 mobile-stack">
      <div class="flex-1 min-w-0">
        <h3 class="font-sans-bold text-gray-900 text-base truncate mobile-title-wrap mobile-text-small">
          {{ location.nom || location.modele || '—' }}
        </h3>
        <p class="text-sm text-gray-600 font-sans-light mt-1 mobile-text-small">
          {{ formattedType }}
        </p>
      </div>
      <div class="flex-shrink-0">
        <StatusIndicator 
          :status="locationStatus.status"
          :label="locationStatus.label"
        />
      </div>
    </div>

    <!-- Informations principales -->
    <div class="space-y-2">
      <!-- Arrondissement -->
      <div class="flex items-center gap-2">
        <span class="text-xs font-sans-bold text-gray-500 uppercase tracking-wide w-20 flex-shrink-0">
          Arr.
        </span>
        <span class="text-sm font-sans-light text-gray-900 mobile-text-small">
          {{ location.arrondissement || '—' }}
        </span>
      </div>

      <!-- Adresse -->
      <div class="flex items-start gap-2">
        <span class="text-xs font-sans-bold text-gray-500 uppercase tracking-wide w-20 flex-shrink-0 mt-0.5">
          Adresse
        </span>
        <span class="text-sm font-sans-light text-gray-900 flex-1 mobile-text-small">
          {{ location.adresse || '—' }}
        </span>
      </div>

      <!-- Accès (si applicable) -->
      <div v-if="showAccessColumn" class="flex items-center gap-2">
        <span class="text-xs font-sans-bold text-gray-500 uppercase tracking-wide w-20 flex-shrink-0">
          Accès
        </span>
        <span class="text-sm font-sans-light text-gray-900 mobile-text-small">
          {{ formatAccessType(location.payant) }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between pt-2 border-t border-gray-100 mobile-stack">
      <!-- Bouton horaires -->
      <button 
        @click="$emit('openSchedule', location)" 
        class="flex items-center gap-2 text-primary-600 font-sans-bold bg-primary-100 px-3 py-2 rounded-lg text-sm hover:bg-primary-200 transition-colors mobile-text-small"
      >
        <span class="text-lg">🕒</span>
        <span>Horaires</span>
      </button>

      <!-- Bouton localisation -->
      <a 
        v-if="location.adresse"
        :href="mapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-primary hover:text-primary-800 font-sans-light text-sm transition-colors mobile-text-small"
      >
        <span class="text-lg">📍</span>
        <span>Localiser</span>
      </a>
    </div>
  </div>
</template>


<style scoped>

@media (max-width: 425px) {
  .mobile-stack {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .mobile-text-small {
    font-size: 14px;
  }
  
  .mobile-title-wrap {
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.3;
  }

  .size-card-mobile {
    max-width: 343px;
    width: 100%;
  }
}

</style>