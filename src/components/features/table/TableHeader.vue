<script setup>
defineProps({
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
  }
});
</script>

<template>
  <thead>
    <tr>
      <th class="p-2 border-b font-sans-bold">
        Statut{{ jourVisite ? ` (${jourVisite})` : ` (${currentDay} ${timeDisplay})` }}
      </th>
      <th class="p-2 border-b font-sans-bold">Nom</th>
      <th class="p-2 border-b font-sans-bold">Type</th>
      <th class="p-2 border-b font-sans-bold">Arrondissement</th>
      <th class="p-2 border-b font-sans-bold">Adresse</th>
      <th v-if="showAccessColumn" class="p-2 border-b font-sans-bold">Accès</th>
      <th class="p-2 border-b font-sans-bold">Horaires</th>
      <th class="p-2 border-b font-sans-bold">Localisation</th>
    </tr>
  </thead>
</template>

