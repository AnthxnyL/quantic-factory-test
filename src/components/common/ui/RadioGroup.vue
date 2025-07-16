<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, null],
    default: null
  },
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
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
    default: 'row', // 'column' | 'row'
    validator: (value) => ['column', 'row'].includes(value)
  }
});

defineEmits(['update:modelValue']);

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
</script>

<template>
  <div class="radio-group">
    <label v-if="label" class="radio-group__label">
      {{ label }}
    </label>
    <div :class="['radio-group__container', `radio-group__container--${layout}`]">
      <label
        v-for="option in options"
        :key="getOptionValue(option)"
        class="radio-group__item"
      >
        <input
          type="radio"
          :name="name"
          :value="getOptionValue(option)"
          :checked="modelValue === getOptionValue(option)"
          @change="$emit('update:modelValue', getOptionValue(option))"
          class="radio-group__input"
        />
        <span class="radio-group__text">{{ getOptionLabel(option) }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.radio-group {
  margin-bottom: 1rem;
}

.radio-group__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-sans-light);
  color: var(--color-black);
}

.radio-group__container {
  display: flex;
  gap: 1rem;
}

.radio-group__container--column {
  flex-direction: column;
  gap: 0.5rem;
}

.radio-group__container--row {
  flex-direction: row;
  flex-wrap: wrap;
}

.radio-group__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-group__item:hover {
  color: var(--color-primary);
}

.radio-group__input {
  width: 1rem;
  height: 1rem;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.radio-group__text {
  font-family: var(--font-sans-light);
  font-size: 0.875rem;
  line-height: 1.2;
}
</style>
