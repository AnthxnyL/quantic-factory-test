import { ref, computed, watch } from 'vue';

export function usePagination(data, options = {}) {
  const {
    defaultItemsPerPage = 20,
    adaptivePageSize = true
  } = options;

  const currentPage = ref(1);
  const itemsPerPage = ref(defaultItemsPerPage);

  // Fonction pour adapter la taille de page selon le volume
  const getAdaptivePageSize = (totalItems) => {
    if (!adaptivePageSize) return defaultItemsPerPage;
    
    if (totalItems > 10000) return 50;
    if (totalItems > 1000) return 30; 
    return 20;
  };


  const totalItems = computed(() => data.value?.length || 0);
  
  const totalPages = computed(() => 
    Math.ceil(totalItems.value / itemsPerPage.value)
  );

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    const slice = (data.value || []).slice(start, end);
    
    return slice.length > 0 ? Object.freeze(slice) : slice;
  });

  const paginationInfo = computed(() => {
    const total = totalItems.value;
    const start = (currentPage.value - 1) * itemsPerPage.value + 1;
    const end = Math.min(currentPage.value * itemsPerPage.value, total);
    
    return {
      start,
      end,
      total,
      hasData: total > 0,
      isLargeDataset: total > 1000,
      isVeryLargeDataset: total > 10000,
      performanceInfo: total > 5000 ? `${Math.round(total/1000)}k éléments` : null
    };
  });

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
      currentPage.value = page;
      
      // Scroll vers le haut pour une meilleure UX
      const tableElement = document.querySelector('.results-table');
      if (tableElement) {
        tableElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
  };

  const changePageSize = (newSize) => {
    const currentPosition = (currentPage.value - 1) * itemsPerPage.value;
    itemsPerPage.value = newSize;
    currentPage.value = Math.floor(currentPosition / newSize) + 1;
  };

  const resetPagination = () => {
    currentPage.value = 1;
  };


  watch(data, (newData) => {
    if (newData) {

      const adaptiveSize = getAdaptivePageSize(newData.length);
      if (itemsPerPage.value === defaultItemsPerPage && adaptiveSize !== defaultItemsPerPage) {
        itemsPerPage.value = adaptiveSize;
      }
      
      if (currentPage.value > totalPages.value && totalPages.value > 0) {
        currentPage.value = 1;
      }
    }
  }, { immediate: true });

  return {
  
    currentPage,
    itemsPerPage, 
    totalPages,
    totalItems,
    paginatedData,
    paginationInfo,
    goToPage,
    changePageSize,
    resetPagination
  };
}
