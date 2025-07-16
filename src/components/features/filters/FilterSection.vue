<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="filter-section">
    <h3 v-if="title" class="filter-section__title">
      {{ title }}
    </h3>
    <div class="filter-section__content">
      <slot />
    </div>
  </div>
</template>


<style scoped>
.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section__title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: var(--font-sans-bold);
  color: var(--color-black);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 0.5rem;
}

.filter-section__content {
  padding-left: 0.5rem;
}
</style>
