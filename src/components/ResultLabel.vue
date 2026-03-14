<script setup lang="ts">
defineProps<{
  label: string
  score: number
}>()
</script>

<template>
  <div class="result-label">
    <div class="label-header">
      <span class="label-name">{{ label }}</span>
      <span class="label-score">{{ score.toFixed(1) }}%</span>
    </div>
    <div class="bar-track">
      <div class="bar-fill" :style="{ width: `${score}%` }" />
    </div>
  </div>
</template>

<style scoped>
.result-label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.label-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.label-score {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.bar-track {
  height: 8px;
  background: var(--color-bar-bg);
  border-radius: 4px;
}

.bar-fill {
  height: 100%;
  background: var(--color-accent-gradient);
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
