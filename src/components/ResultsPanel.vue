<script setup lang="ts">
import ResultLabel from './ResultLabel.vue'
import type { ClassifyResponse } from '../composables/useImageAnalysis'

defineProps<{
  result: ClassifyResponse | null
}>()
</script>

<template>
  <section v-if="result" class="results-panel">
    <h2 class="results-title">Results</h2>

    <div class="top-result">
      <span class="top-label">{{ result.top_label }}</span>
      <span class="top-confidence">{{ (result.top_confidence * 100).toFixed(1) }}%</span>
      <span v-if="result.needs_review" class="needs-review">Needs Review</span>
    </div>

    <div class="results-list">
      <ResultLabel
        v-for="pred in result.predictions"
        :key="pred.label"
        :label="pred.label"
        :score="pred.confidence * 100"
      />
    </div>
  </section>
</template>

<style scoped>
.results-panel {
  background: var(--color-background-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

.results-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 1.25rem;
}

.top-result {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding: 0.75rem;
  background: var(--color-background);
  border-radius: var(--radius-sm);
}

.top-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.top-confidence {
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-variant-numeric: tabular-nums;
}

.needs-review {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 600;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
