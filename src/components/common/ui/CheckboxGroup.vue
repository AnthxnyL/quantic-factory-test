<script setup>
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  valueKey: {
    type: String,
    default: null
  },
  labelKey: {
    type: String,
    default: null
  },
  layout: {
    type: String,
    default: 'column', // 'column' | 'row' | 'grid'
    validator: (value) => ['column', 'row', 'grid'].includes(value)
  }
});

const emit = defineEmits(['update:modelValue']);

const getOptionValue = (option) => {
  if (props.valueKey && typeof option === 'object') {
    return option[props.valueKey];
  }
  return option;
};

const getOptionLabel = (option) => {
  if (props.labelKey && typeof option === 'object') {
    return option[props.labelKey];
  }
  return option;
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
  <div class="checkbox-group">
    <label v-if="label" class="checkbox-group__label">
      {{ label }}
    </label>
    <div class="checkbox-group__container">
      <label
        v-for="option in options"
        :key="getOptionValue(option)"
        class="checkbox-group__item"
      >
        <input
          type="checkbox"
          :value="getOptionValue(option)"
          :checked="modelValue.includes(getOptionValue(option))"
          @change="handleChange"
          class="checkbox-group__input"
        />
        <span class="checkbox-group__text">{{ getOptionLabel(option) }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.checkbox-group {
  margin-bottom: 1rem;
}

.checkbox-group__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-sans-light);
  color: var(--color-black);
}

.checkbox-group__container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-group__container.row {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.checkbox-group__container.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
}

.checkbox-group__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox-group__item:hover {
  color: var(--color-primary);
}

.checkbox-group__input {
  width: 1rem;
  height: 1rem;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.checkbox-group__text {
  font-family: var(--font-sans-light);
  font-size: 0.875rem;
  line-height: 1.2;
}
</style>
