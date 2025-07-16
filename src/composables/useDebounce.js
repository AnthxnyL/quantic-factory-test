import { ref } from 'vue';

// Fonction pour gérer les appels asynchrones avec un délai
export function useDebounce(func, delay = 300) {
  const timeoutId = ref(null);
  const isExecuting = ref(false);

  const debouncedFunction = (...args) => {
    if (isExecuting.value) return;

    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
    }

    timeoutId.value = setTimeout(async () => {
      if (!isExecuting.value) {
        isExecuting.value = true;
        try {
          await func(...args);
        } finally {
          isExecuting.value = false;
        }
      }
    }, delay);
  };

  const cancel = () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value);
      timeoutId.value = null;
    }
    isExecuting.value = false;
  };

  return {
    debouncedFunction,
    cancel,
    isExecuting: isExecuting.value
  };
}
