<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
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
  <div class="select-input text-red-500">
    <label v-if="label" class="select-input__label">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="select-input__field"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="getOptionValue(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>
  </div>
</template>


<style scoped>
.select-input {
  margin-bottom: 1rem;
}

.select-input__label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-sans-light);
  color: var(--color-black);
}

.select-input__field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background-color: var(--color-white);
  font-family: var(--font-sans-light);
  font-size: 0.875rem;
  transition: all 0.2s ease;
  outline: none;
  cursor: pointer;
}

.select-input__field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(95, 37, 159, 0.1);
}

.select-input__field:hover {
  border-color: #d1d5db;
}
</style>
