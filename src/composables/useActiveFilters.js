import { computed } from 'vue';
import { formatFountainType, formatDisplayType } from '@/utils/mapping';

// Fonction pour gérer les filtres actifs 
export function useActiveFilters(filters) {
  const createRemoveAction = (filterType, value) => () => {
    const newFilters = { ...filters.value };
    
    switch (filterType) {
      case 'arrondissement':
        newFilters.arrondissements = newFilters.arrondissements.filter(a => a !== value);
        break;
      case 'typeEquipement':
        newFilters.typesEquipements = newFilters.typesEquipements.filter(t => t !== value);
        break;
      case 'typeEspace':
        newFilters.typesEspaces = newFilters.typesEspaces.filter(t => t !== value);
        break;
      case 'typeFontaine':
        newFilters.typesFontaines = newFilters.typesFontaines.filter(t => t !== value);
        break;
      case 'payant':
        newFilters.payant = null;
        break;
      case 'jour':
        newFilters.jourVisite = '';
        break;
      case 'search':
        newFilters.search = '';
        break;
    }
    
    filters.value = newFilters;
  };

  const createActiveFilters = () => {
    const active = [];
    const currentFilters = filters.value;

    currentFilters.arrondissements.forEach(arr => {
      const num = arr.slice(-2);
      active.push({
        type: 'arrondissement',
        label: `${num}e arrondissement`,
        value: arr,
        removeAction: createRemoveAction('arrondissement', arr)
      });
    });

    currentFilters.typesEquipements.forEach(type => {
      active.push({
        type: 'typeEquipement',
        label: `Équipement: ${formatDisplayType(type, 'equipements')}`,
        value: type,
        removeAction: createRemoveAction('typeEquipement', type)
      });
    });

    currentFilters.typesEspaces.forEach(type => {
      active.push({
        type: 'typeEspace',
        label: `Espace vert: ${formatDisplayType(type, 'espaces')}`,
        value: type,
        removeAction: createRemoveAction('typeEspace', type)
      });
    });

    currentFilters.typesFontaines.forEach(type => {
      active.push({
        type: 'typeFontaine',
        label: `Fontaine: ${formatFountainType(type)}`,
        value: type,
        removeAction: createRemoveAction('typeFontaine', type)
      });
    });

    if (currentFilters.payant !== null) {
      active.push({
        type: 'payant',
        label: `Accès: ${currentFilters.payant === 'Oui' ? 'Payant' : 'Gratuit'}`,
        value: currentFilters.payant,
        removeAction: createRemoveAction('payant', currentFilters.payant)
      });
    }

    if (currentFilters.jourVisite) {
      const dayLabel = currentFilters.jourVisite.charAt(0).toUpperCase() + currentFilters.jourVisite.slice(1);
      active.push({
        type: 'jour',
        label: `Jour: ${dayLabel}`,
        value: currentFilters.jourVisite,
        removeAction: createRemoveAction('jour', currentFilters.jourVisite)
      });
    }

    if (currentFilters.search.trim()) {
      active.push({
        type: 'search',
        label: `Recherche: "${currentFilters.search}"`,
        value: currentFilters.search,
        removeAction: createRemoveAction('search', currentFilters.search)
      });
    }

    return active;
  };

  const activeFilters = computed(() => createActiveFilters());

    // Fonction pour réinitialiser tous les filtres
  const clearAllFilters = () => {
    filters.value = {
      arrondissements: [],
      typesEquipements: [],
      typesEspaces: [],
      typesFontaines: [],
      payant: null,
      jourVisite: '',
      search: '',
    };
  };

  return {
    activeFilters,
    clearAllFilters
  };
}
