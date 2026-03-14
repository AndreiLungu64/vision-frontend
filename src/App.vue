<script setup lang="ts">
import { ref } from 'vue'
import ImageUploader from './components/ImageUploader.vue'
import ResultsPanel from './components/ResultsPanel.vue'
import { useImageAnalysis } from './composables/useImageAnalysis'

const selectedFile = ref<File | null>(null)

const { result, isLoading, error, analyze, reset } = useImageAnalysis()

function onFileSelected(file: File) {
  selectedFile.value = file
  reset()
}

async function onAnalyze() {
  if (!selectedFile.value) return
  await analyze(selectedFile.value)
}
</script>

<template>
  <header class="app-header">
    <h1 class="app-title">VisionAI</h1>
    <p class="app-subtitle">Upload an image to analyze its contents using AI</p>
  </header>

  <main class="app-main">
    <section class="upload-card">
      <ImageUploader @file-selected="onFileSelected" />

      <button class="analyze-btn" :disabled="!selectedFile || isLoading" @click="onAnalyze">
        <template v-if="isLoading">
          <span class="spinner" />
          Analyzing...
        </template>
        <template v-else> Upload and Analyze </template>
      </button>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </section>

    <ResultsPanel :result="result" />
  </main>
</template>

<style scoped>
.app-header {
  text-align: center;
  margin-bottom: 2rem;
}

.app-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.app-subtitle {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-top: 0.35rem;
}

.app-main {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.upload-card {
  flex: 1;
  background: var(--color-background-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}

.analyze-btn {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.analyze-btn:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

.analyze-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-msg {
  color: #ef4444;
  font-size: 0.85rem;
  text-align: center;
}
</style>
