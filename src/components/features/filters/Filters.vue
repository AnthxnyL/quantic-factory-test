<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import { fetchUniqueFieldValues } from '@/services/api';
import {
  SearchSection,
  LocationSection,
  EquipmentSection,
  SpaceSection,
  FountainSection,
  AccessSection,
  ScheduleSection
} from '.';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue']);


const collapsedSections = ref({
  location: true,
  equipments: true,
  spaces: true,
  fountains: true,
  access: true,
  schedule: true
});

const filters = ref({
  arrondissements: [],
  typesEquipements: [],
  typesEspaces: [],
  typesFontaines: [],
  payant: null,
  jourVisite: '',
  search: '',
  ...props.modelValue
});

watch(filters, (val) => {
  emit('update:modelValue', val);
}, { deep: true });

// Watch pour synchroniser les changements
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    filters.value = { ...newVal };
  }
}, { deep: true });


const toggleSection = (section) => {
  collapsedSections.value[section] = !collapsedSections.value[section];
};

const availableEquipTypes = ref([]);
const availableEspaceTypes = ref([]);
const availableFontaineTypes = ref([]);

const fetchTypes = async () => {
  const arrs = filters.value.arrondissements;

  const whereClause = arrs.length
    ? `(${arrs.map(a => `arrondissement="${a}"`).join(' OR ')})`
    : '';

  // Récupère les types disponibles dans l’arrondissement sélectionné
  availableEquipTypes.value = await fetchUniqueFieldValues(
    'ilots-de-fraicheur-equipements-activites',
    'type',
    whereClause
  );

  availableEspaceTypes.value = await fetchUniqueFieldValues(
    'ilots-de-fraicheur-espaces-verts-frais',
    'type',
    whereClause
  );

  const communes = arrs.map(arr => {
    const num = parseInt(arr.slice(-2));
    return `PARIS ${num}EME ARRONDISSEMENT`;
  });
  
  const fontaineWhere = communes.length
    ? `(${communes.map(c => `commune="${c}"`).join(' OR ')})`
    : '';

  availableFontaineTypes.value = await fetchUniqueFieldValues(
    'fontaines-a-boire',
    'type_objet',
    fontaineWhere
  );
};

watch(() => filters.value.arrondissements, fetchTypes, { immediate: true });

// Filtrage des types
const filteredTypesEquipements = computed(() => {
  const all = new Set([
    ...availableEquipTypes.value,
    ...filters.value.typesEquipements
  ]);
  return Array.from(all).sort();
});

const filteredTypesEspaces = computed(() => {
  const all = new Set([
    ...availableEspaceTypes.value,
    ...filters.value.typesEspaces
  ]);
  return Array.from(all).sort();
});

const filteredTypesFontaines = computed(() => {
  const all = new Set([
    ...availableFontaineTypes.value,
    ...filters.value.typesFontaines
  ]);
  return Array.from(all).sort();
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 lg:mb-8">
    <div class="p-4 lg:p-6 border-b border-gray-200">
      <h2 class="text-lg lg:text-xl font-sans-bold text-gray-900">Filtres de recherche</h2>
      <p class="text-sm text-gray-600 mt-1">Affinez votre recherche de lieux frais</p>
    </div>

    <div class="p-4 lg:p-6 space-y-4 lg:space-y-6">
      
      <!-- Section Recherche libre -->
      <SearchSection 
        :search="filters.search"
        @update:search="filters.search = $event"
      />

      <!-- Section Localisation -->
      <LocationSection
        :arrondissements="filters.arrondissements"
        :isCollapsed="collapsedSections.location"
        @update:arrondissements="filters.arrondissements = $event"
        @toggle="toggleSection('location')"
      />

      <!-- Section Équipements -->
      <EquipmentSection
        :typesEquipements="filters.typesEquipements"
        :availableTypes="filteredTypesEquipements"
        :isCollapsed="collapsedSections.equipments"
        @update:typesEquipements="filters.typesEquipements = $event"
        @toggle="toggleSection('equipments')"
      />

      <!-- Section Espaces verts -->
      <SpaceSection
        :typesEspaces="filters.typesEspaces"
        :availableTypes="filteredTypesEspaces"
        :isCollapsed="collapsedSections.spaces"
        @update:typesEspaces="filters.typesEspaces = $event"
        @toggle="toggleSection('spaces')"
      />

      <!-- Section Fontaines -->
      <FountainSection
        :typesFontaines="filters.typesFontaines"
        :availableTypes="filteredTypesFontaines"
        :isCollapsed="collapsedSections.fountains"
        @update:typesFontaines="filters.typesFontaines = $event"
        @toggle="toggleSection('fountains')"
      />

      <!-- Section Accès et horaires -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        
        <!-- Section Accès -->
        <AccessSection
          :payant="filters.payant"
          :isCollapsed="collapsedSections.access"
          @update:payant="filters.payant = $event"
          @toggle="toggleSection('access')"
        />

        <!-- Section Horaires -->
        <ScheduleSection
          :jourVisite="filters.jourVisite"
          :isCollapsed="collapsedSections.schedule"
          @update:jourVisite="filters.jourVisite = $event"
          @toggle="toggleSection('schedule')"
        />

      </div>
    </div>
  </div>
</template>
