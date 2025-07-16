<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  label: {
    type: String,
    default: 'Arrondissements'
  }
});

const emit = defineEmits(['update:modelValue']);

const getArrondissementCode = (n) => {
  return '750' + (n < 10 ? '0' + n : n);
};

const handleChange = (event) => {
  const value = event.target.value;
  const checked = event.target.checked;
  const currentValues = [...props.modelValue];
  
  if (checked) {
    if (!currentValues.includes(value)) {
      currentValues.push(value);
    }
  } else {
    const index = currentValues.indexOf(value);
    if (index > -1) {
      currentValues.splice(index, 1);
    }
  }
  
  emit('update:modelValue', currentValues);
};
</script>

<template>
  <div class="arrondissement-selector">
    <label v-if="label" class="arrondissement-selector__label">
      {{ label }}
    </label>
    <div class="arrondissement-selector__grid">
      <label
        v-for="n in 20"
        :key="n"
        class="arrondissement-selector__item"
      >
        <input
          type="checkbox"
          :value="getArrondissementCode(n)"
          :checked="modelValue.includes(getArrondissementCode(n))"
          @change="handleChange"
          class="arrondissement-selector__input"
        />
        <span class="arrondissement-selector__text">{{ n }}e</span>
      </label>
    </div>
  </div>
</template>


<style scoped>
.arrondissement-selector {
  margin-bottom: 1rem;
}

.arrondissement-selector__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-sans-light);
  color: var(--color-black);
}

.arrondissement-selector__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.5rem;
}

.arrondissement-selector__item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.25rem;
  border-radius: 0.25rem;
}

.arrondissement-selector__item:hover {
  background-color: rgba(95, 37, 159, 0.05);
  color: var(--color-primary);
}

.arrondissement-selector__input {
  width: 0.875rem;
  height: 0.875rem;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.arrondissement-selector__text {
  font-family: var(--font-sans-light);
  font-size: 0.75rem;
  line-height: 1;
  white-space: nowrap;
}
</style>
