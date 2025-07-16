<script setup>
import { ref, computed, watch } from 'vue';
import Filters from '@/components/features/filters/Filters.vue';
import { LoadingIndicator, ViewNavigation, PerformanceIndicator } from '@/components/common';
import { DataViews } from '@/components/features/search';
import ActiveFilters from '@/components/features/filters/ActiveFilters.vue';
import { useDataManager } from '@/composables/useDataManager';
import { useScheduleLogic } from '@/composables/useScheduleLogic';
import { useDebounce } from '@/composables/useDebounce';
import { useActiveFilters } from '@/composables/useActiveFilters';

const filters = ref({
  arrondissements: [],
  typesEquipements: [],
  typesEspaces: [],
  typesFontaines: [],
  payant: null,
  jourVisite: '',
  search: '',
});

const view = ref('all');

const {
  equipments,
  greenSpaces,
  fountains,
  isLoading,
  isInitialized,
  loadData,
  getCombinedData
} = useDataManager();

const { getOpeningStatus, sortByOpeningStatus } = useScheduleLogic();

// Debounce pour optimiser les requêtes
const { debouncedFunction: debouncedLoadData } = useDebounce(
  () => loadData(filters.value),
  300
);

// Gestion des filtres actifs
const { activeFilters, clearAllFilters } = useActiveFilters(filters);

// Computed pour les données combinées avec tri
const combinedData = computed(() => 
  getCombinedData(filters.value, sortByOpeningStatus)
);

// Computed pour les données triées par vue
const sortedEquipments = computed(() => 
  sortByOpeningStatus(equipments.value, filters.value.jourVisite)
);

const sortedGreenSpaces = computed(() => 
  sortByOpeningStatus(greenSpaces.value, filters.value.jourVisite)
);

const sortedFountains = computed(() => 
  sortByOpeningStatus(
    combinedData.value.filter(d => d.source === 'fontaines'), 
    filters.value.jourVisite
  )
);


let watcherLocked = false;

watch(filters, () => {
  if (watcherLocked) return;
  
  if (isInitialized.value) {
    watcherLocked = true;
    try {
      debouncedLoadData();
    } finally {
      setTimeout(() => {
        watcherLocked = false;
      }, 100);
    }
  }
}, { deep: true });

loadData(filters.value).then(() => {
  isInitialized.value = true;
});
</script>


<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      
      <div class="text-center lg:text-left mb-8 lg:mb-12">
        <h1 class="text-3xl lg:text-4xl font-sans-bold text-gray-900 mb-2">
          Trouvez un endroit frais à Paris
        </h1>
        <p class="text-lg text-gray-600">
          Découvrez les espaces verts, équipements et fontaines pour vous rafraîchir dans la capitale
        </p>
      </div>
      <Filters v-model="filters" />

      <ActiveFilters 
        :filters="activeFilters"
        @clearAll="clearAllFilters"
      />

      <LoadingIndicator 
        :isLoading="isLoading"
        :isInitialized="isInitialized"
      />

      <div v-if="!isLoading">
        <ViewNavigation
          :currentView="view"
          :combinedDataLength="combinedData.length"
          :equipmentsLength="equipments.length"
          :greenSpacesLength="greenSpaces.length"
          :fountainsLength="sortedFountains.length"
          @update:currentView="view = $event"
        />
        
        <PerformanceIndicator :dataLength="combinedData.length" />

        <DataViews
          :currentView="view"
          :sortedEquipments="sortedEquipments"
          :sortedGreenSpaces="sortedGreenSpaces"
          :sortedFountains="sortedFountains"
          :combinedData="combinedData"
          :jourVisite="filters.jourVisite"
          :getStatutJour="getOpeningStatus"
        />
      </div>
    </div>
  </div>
</template>