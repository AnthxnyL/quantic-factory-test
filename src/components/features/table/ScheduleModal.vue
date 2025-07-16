<script setup>
import { computed } from 'vue';

const props = defineProps({
  isVisible: { type: Boolean, required: true },
  location: { type: Object, default: () => ({}) },
  currentDay: { type: String, required: true }
});

const emit = defineEmits(['close']);

const is24Hours = computed(() => 
  props.location.ouvert_24h?.toLowerCase() === 'oui'
);

const weekDays = computed(() => [
  { key: 'lundi', label: 'Lundi', field: 'horaires_lundi', isToday: props.currentDay === 'lundi' },
  { key: 'mardi', label: 'Mardi', field: 'horaires_mardi', isToday: props.currentDay === 'mardi' },
  { key: 'mercredi', label: 'Mercredi', field: 'horaires_mercredi', isToday: props.currentDay === 'mercredi' },
  { key: 'jeudi', label: 'Jeudi', field: 'horaires_jeudi', isToday: props.currentDay === 'jeudi' },
  { key: 'vendredi', label: 'Vendredi', field: 'horaires_vendredi', isToday: props.currentDay === 'vendredi' },
  { key: 'samedi', label: 'Samedi', field: 'horaires_samedi', isToday: props.currentDay === 'samedi' },
  { key: 'dimanche', label: 'Dimanche', field: 'horaires_dimanche', isToday: props.currentDay === 'dimanche' }
]);

const hasNoScheduleInfo = computed(() => 
  !is24Hours.value && 
  !props.location.horaires_lundi && 
  !props.location.horaires_mardi
);
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="$emit('close')"
  >
    <div
      class="bg-white border-2 border-gray-300 rounded-lg shadow-xl w-96 max-h-96 overflow-y-auto p-6"
      @click.stop
    >
      <div class="flex justify-between items-center mb-4">
        <h4 class="font-sans-bold text-gray-800">Horaires - {{ location.nom }}</h4>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-xl font-sans-bold">×</button>
      </div>

      <div v-if="is24Hours" class="mb-3 text-green-600 font-sans-bold">
        🕒 Ouvert 24h/24
      </div>

      <div v-if="location.horaires_periode" class="italic text-gray-700 mb-3">
        📅 {{ location.horaires_periode }}
      </div>

      <ul v-if="!is24Hours" class="space-y-2 text-black">
        <li 
          v-for="day in weekDays" 
          :key="day.key"
          :class="{ 'bg-primary-100 p-1 rounded': day.isToday }">
        >
          <strong>{{ day.label }} :</strong> {{ location[day.field] || '–' }}
          <span v-if="day.isToday" class="text-primary-600 text-sm ml-2">← Aujourd'hui</span>
        </li>
      </ul>

      <div v-if="location.ouverture_estivale_nocturne?.toLowerCase() === 'oui'" class="mt-3 text-primary-700 text-sm font-sans-light">
        🌆 Ouvert en soirée l'été
      </div>

      <div v-if="hasNoScheduleInfo" class="italic text-gray-500 mt-3">
        ℹ️ Horaires non renseignés
      </div>
    </div>
  </div>
</template>

