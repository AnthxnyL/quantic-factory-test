<script setup>
const props = defineProps({
  currentView: { type: String, required: true },
  combinedDataLength: { type: Number, default: 0 },
  equipmentsLength: { type: Number, default: 0 },
  greenSpacesLength: { type: Number, default: 0 },
  fountainsLength: { type: Number, default: 0 }
});

const emit = defineEmits(['update:currentView']);

// Fonction pour formater les compteurs
const formatCount = (count) => {
  if (count > 1000) {
    return `(${Math.round(count/1000)}k)`;
  }
  if (count > 500) {
    return `(${count})`;
  }
  return '';
};

const isActive = (view) => props.currentView === view;
</script>

<template>
  <div class="mb-6 lg:mb-8">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
      <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button 
          @click="$emit('update:currentView', 'all')" 
          :class="[
            'px-4 py-2 rounded-md text-sm lg:text-base font-sans-bold transition-all duration-200',
            'flex items-center justify-between sm:justify-center',
            isActive('all') 
              ? 'bg-primary-600 text-white shadow-md' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          ]"
        >
          <span>Tous les lieux</span>
          <span 
            v-if="combinedDataLength > 5000" 
            :class="[
              'text-xs ml-2 px-2 py-1 rounded-full',
              isActive('all') ? 'bg-primary-500 text-primary-100' : 'bg-primary-100 text-primary-600'
            ]"
          >
            {{ formatCount(combinedDataLength) }}
          </span>
        </button>
        
        <button 
          @click="$emit('update:currentView', 'equipements')" 
          :class="[
            'px-4 py-2 rounded-md text-sm lg:text-base font-sans-bold transition-all duration-200',
            'flex items-center justify-between sm:justify-center',
            isActive('equipements') 
              ? 'bg-primary-600 text-white shadow-md' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          ]"
        >
          <span>Équipements</span>
          <span 
            v-if="equipmentsLength > 1000" 
            :class="[
              'text-xs ml-2 px-2 py-1 rounded-full',
              isActive('equipements') ? 'bg-primary-500 text-primary-100' : 'bg-primary-100 text-primary-600'
            ]"
          >
            {{ formatCount(equipmentsLength) }}
          </span>
        </button>
        
        <button 
          @click="$emit('update:currentView', 'espaces')" 
          :class="[
            'px-4 py-2 rounded-md text-sm lg:text-base font-sans-bold transition-all duration-200',
            'flex items-center justify-between sm:justify-center',
            isActive('espaces') 
              ? 'bg-primary-600 text-white shadow-md' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          ]"
        >
          <span>Espaces verts</span>
          <span 
            v-if="greenSpacesLength > 1000" 
            :class="[
              'text-xs ml-2 px-2 py-1 rounded-full',
              isActive('espaces') ? 'bg-primary-500 text-primary-100' : 'bg-green-100 text-green-600'
            ]"
          >
            {{ formatCount(greenSpacesLength) }}
          </span>
        </button>
        
        <button 
          @click="$emit('update:currentView', 'fontaines')" 
          :class="[
            'px-4 py-2 rounded-md text-sm lg:text-base font-sans-bold transition-all duration-200',
            'flex items-center justify-between sm:justify-center',
            isActive('fontaines') 
              ? 'bg-primary-600 text-white shadow-md' 
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          ]"
        >
          <span>Fontaines</span>
          <span 
            v-if="fountainsLength > 500" 
            :class="[
              'text-xs ml-2 px-2 py-1 rounded-full',
              isActive('fontaines') ? 'bg-primary-500 text-primary-100' : 'bg-cyan-100 text-cyan-600'
            ]"
          >
            {{ formatCount(fountainsLength) }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
