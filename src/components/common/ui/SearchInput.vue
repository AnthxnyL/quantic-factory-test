<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="search-input">
    <label v-if="label" class="search-input__label">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :type="type"
      class="search-input__field"
    />
  </div>
</template>


<style scoped>
.search-input {
  margin-bottom: 1rem;
}

.search-input__label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: var(--font-sans-light);
  color: var(--color-black);
}

.search-input__field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  outline: none;
  font-family: var(--font-sans-light);
  background-color: var(--color-white);
}

.search-input__field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(95, 37, 159, 0.1);
}

.search-input__field::placeholder {
  color: #9ca3af;
}
</style>
