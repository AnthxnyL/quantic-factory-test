<script setup>
import { ResultsTable } from '../table';

defineProps({
  currentView: { type: String, required: true },
  sortedEquipments: { type: Array, default: () => [] },
  sortedGreenSpaces: { type: Array, default: () => [] },
  sortedFountains: { type: Array, default: () => [] },
  combinedData: { type: Array, default: () => [] },
  jourVisite: { type: String, default: '' },
  getStatutJour: { type: Function, required: true }
});
</script>

<template>
  <div>
    <ResultsTable 
      v-if="currentView === 'equipements'" 
      title="Équipements & Activités" 
      :data="sortedEquipments" 
      :jourVisite="jourVisite" 
      :getStatutJour="getStatutJour" 
    />
    <ResultsTable 
      v-else-if="currentView === 'espaces'" 
      title="Espaces Verts Frais" 
      :data="sortedGreenSpaces" 
      :jourVisite="jourVisite" 
      :getStatutJour="getStatutJour" 
    />
    <ResultsTable
      v-else-if="currentView === 'fontaines'"
      title="Fontaines à Boire"
      :data="sortedFountains"
      :jourVisite="jourVisite"
      :getStatutJour="getStatutJour"
    />
    <ResultsTable 
      v-else 
      title="Tous les lieux frais" 
      :data="combinedData" 
      :jourVisite="jourVisite" 
      :getStatutJour="getStatutJour" 
    />
  </div>
</template>
