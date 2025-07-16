<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePagination } from '@/composables/usePagination';
import { useScheduleLogic } from '@/composables/useScheduleLogic';
import {
    TableTitle,
    DataTable,
    DataCards,
    Pagination,
    ScheduleModal
} from '.';

const props = defineProps({
  data: { type: Array, required: true },
  title: { type: String, required: true },
  jourVisite: { type: String, default: '' },
  getStatutJour: { type: Function, default: null }
});

const DAYS_MAP = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

const { getOpeningStatus } = useScheduleLogic();

const {
  currentPage,
  itemsPerPage,
  totalPages,
  totalItems,
  paginatedData,
  paginationInfo,
  goToPage,
  changePageSize
} = usePagination(computed(() => props.data));

const currentTime = ref(new Date());
let timeInterval = null;

const selectedLocation = ref(null);

const timeDisplay = computed(() => 
  currentTime.value.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
);

const currentDay = computed(() => {
  if (props.jourVisite) return props.jourVisite;
  return DAYS_MAP[currentTime.value.getDay()];
});

const showAccessColumn = computed(() => props.title.includes('Équipements'));

const getLocationStatus = (location) => {
  if (props.getStatutJour) {
    return props.getStatutJour(location, props.jourVisite);
  }
  return getOpeningStatus(location, props.jourVisite);
};

const openScheduleModal = (location) => {
  selectedLocation.value = location;
};

const closeScheduleModal = () => {
  selectedLocation.value = null;
};

onMounted(() => {
  timeInterval = setInterval(() => {
    currentTime.value = new Date();
  }, 60000);
});

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval);
});
</script>
<template>
  <div class="mb-8 results-table">
    <TableTitle
      :title="title"
      :jour-visite="jourVisite"
      :current-day="currentDay"
      :time-display="timeDisplay"
      :total-items="totalItems"
    />

    <div class="hidden lg:block">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        :isLargeDataset="paginationInfo.isLargeDataset"
        :isVeryLargeDataset="paginationInfo.isVeryLargeDataset"
        :performanceInfo="paginationInfo.performanceInfo"
        @goToPage="goToPage"
        @update:itemsPerPage="changePageSize"
      />
    </div>

    <div class="hidden lg:block">
      <DataTable
        :data="paginatedData"
        :jour-visite="jourVisite"
        :current-day="currentDay"
        :time-display="timeDisplay"
        :show-access-column="showAccessColumn"
        :get-location-status="getLocationStatus"
        @open-schedule="openScheduleModal"
      />
    </div>

    <!-- Cards mobile uniquement -->
    <div class="lg:hidden">
      <DataCards
        :data="paginatedData"
        :show-access-column="showAccessColumn"
        :get-location-status="getLocationStatus"
        @open-schedule="openScheduleModal"
      />
    </div>

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :totalItems="totalItems"
      :itemsPerPage="itemsPerPage"
      :isLargeDataset="paginationInfo.isLargeDataset"
      :isVeryLargeDataset="paginationInfo.isVeryLargeDataset"
      :performanceInfo="paginationInfo.performanceInfo"
      @goToPage="goToPage"
      @update:itemsPerPage="changePageSize"
    />

    <ScheduleModal
      :isVisible="!!selectedLocation"
      :location="selectedLocation || {}"
      :currentDay="currentDay"
      @close="closeScheduleModal"
    />
  </div>
</template>
