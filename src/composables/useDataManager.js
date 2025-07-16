import { ref, computed, watch } from 'vue';
import { fetchDataset } from '@/services/api';
import { arrondissementLabel, inverseArrondissementLabel } from '@/utils/mapping';

// Fonction pour gérer les données des équipements, espaces verts et fontaines
export function useDataManager() {
  const equipments = ref([]);
  const greenSpaces = ref([]);
  const fountains = ref([]);
  const isLoading = ref(true);
  const isInitialized = ref(false);

  // Cache pour les tris (performance)
  const sortCache = new Map();

  // Normalisation des données
  const normalizeGreenSpaces = (spaces) => 
    spaces.map(space => ({ ...space, source: 'espaces', payant: null }));

  const normalizeEquipments = (equips) => 
    equips.map(equip => ({ ...equip, source: 'equipements' }));

  const normalizeFountains = (fountains) => 
    fountains.map(fountain => ({
      nom: 'Fontaine à boire',
      type: fountain.type_objet || 'Fontaine',
      adresse: [fountain.no_voirie_pair || fountain.no_voirie_impair, fountain.voie]
        .filter(Boolean).join(' '),
      arrondissement: inverseArrondissementLabel(fountain.commune),
      ouvert_24h: 'oui',
      horaires_lundi: null,
      horaires_mardi: null,
      horaires_mercredi: null,
      horaires_jeudi: null,
      horaires_vendredi: null,
      horaires_samedi: null,
      horaires_dimanche: null,
      statut_ouverture: fountain.dispo?.toLowerCase() === 'oui' ? 'ouvert' : null,
      source: 'fontaines',
      payant: 'Non',
    }));

  // Construction des requêtes
  const buildWhereClause = (conditions) => 
    conditions.length ? conditions.join(' AND ') : undefined;

  const buildGreenSpacesQuery = (filters) => {
    const conditions = [];
    if (filters.arrondissements.length) {
      conditions.push(`(${filters.arrondissements.map(a => `arrondissement="${a}"`).join(' OR ')})`);
    }
    if (filters.typesEspaces.length) {
      conditions.push(`(${filters.typesEspaces.map(t => `type="${t}"`).join(' OR ')})`);
    }
    if (filters.search) {
      conditions.push(`search(*, "${filters.search}")`);
    }
    return { where: buildWhereClause(conditions) };
  };

  const buildEquipmentsQuery = (filters) => {
    const conditions = [];
    if (filters.arrondissements.length) {
      conditions.push(`(${filters.arrondissements.map(a => `arrondissement="${a}"`).join(' OR ')})`);
    }
    if (filters.typesEquipements.length) {
      conditions.push(`(${filters.typesEquipements.map(t => `type="${t}"`).join(' OR ')})`);
    }
    if (filters.payant) {
      conditions.push(`payant="${filters.payant}"`);
    }
    if (filters.search) {
      conditions.push(`search(*, "${filters.search}")`);
    }
    return { where: buildWhereClause(conditions) };
  };

  const buildFountainsQuery = (filters) => {
    const conditions = [];
    if (filters.arrondissements.length) {
      conditions.push(`(${filters.arrondissements.map(a => `commune="${arrondissementLabel(a)}"`).join(' OR ')})`);
    }
    if (filters.typesFontaines.length) {
      conditions.push(`(${filters.typesFontaines.map(t => `type_objet="${t}"`).join(' OR ')})`);
    }
    if (filters.search) {
      conditions.push(`search(*, "${filters.search}")`);
    }
    return { where: buildWhereClause(conditions) };
  };

  // Chargement des données
  const loadData = async (filters) => {
    if (!isLoading.value) {
      isLoading.value = true;
    }
    
    try {
      const queries = [
        fetchDataset('ilots-de-fraicheur-espaces-verts-frais', buildGreenSpacesQuery(filters)),
        fetchDataset('ilots-de-fraicheur-equipements-activites', buildEquipmentsQuery(filters)),
        fetchDataset('fontaines-a-boire', buildFountainsQuery(filters))
      ];

      const [spacesResult, equipResult, fountainsResult] = await Promise.all(queries);
      
      greenSpaces.value = spacesResult;
      equipments.value = equipResult;
      fountains.value = fountainsResult;
      
      isInitialized.value = true;
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      greenSpaces.value = [];
      equipments.value = [];
      fountains.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  

  // Combinaison des données avec cache
  const getCombinedData = (filters, sortFunction) => {
    const { typesEspaces, typesEquipements, typesFontaines, jourVisite } = filters;

    const normSpaces = normalizeGreenSpaces(greenSpaces.value || [])
      .filter(e => typesEspaces.length === 0 || typesEspaces.includes(e.type));

    const normEquip = normalizeEquipments(equipments.value || [])
      .filter(e => typesEquipements.length === 0 || typesEquipements.includes(e.type));

    const normFountains = normalizeFountains(fountains.value || [])
      .filter(f => typesFontaines.length === 0 || typesFontaines.includes(f.type));

    const activeSpaceFilters = typesEspaces.length > 0;
    const activeEquipFilters = typesEquipements.length > 0;
    const activeFountainFilters = typesFontaines.length > 0;

    let result = [];
    
    if (activeSpaceFilters && !activeEquipFilters && !activeFountainFilters) {
      result = normSpaces;
    } else if (activeEquipFilters && !activeSpaceFilters && !activeFountainFilters) {
      result = normEquip;
    } else if (activeFountainFilters && !activeSpaceFilters && !activeEquipFilters) {
      result = normFountains;
    } else {
      result = [...normEquip, ...normSpaces, ...normFountains];
    }

    // Cache pour le tri - optimisation performance
    const cacheKey = `${result.length}-${jourVisite}`;
    if (sortCache.has(cacheKey) && result.length > 5000) {
      return sortCache.get(cacheKey);
    }

    const sortedResult = sortFunction ? sortFunction(result, jourVisite) : result;
    
    // Mettre en cache si gros volume
    if (result.length > 5000) {
      sortCache.set(cacheKey, sortedResult);
      // Nettoyer le cache s'il devient trop gros
      if (sortCache.size > 10) {
        const firstKey = sortCache.keys().next().value;
        sortCache.delete(firstKey);
      }
    }
    
    return sortedResult;
  };

  return {
    equipments,
    greenSpaces,
    fountains,
    isLoading,
    isInitialized,
    loadData,
    getCombinedData,
    normalizeGreenSpaces,
    normalizeEquipments,
    normalizeFountains
  };
}
