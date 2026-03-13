<script setup lang="ts"></script>

<template>
  <header class="app-header">
    <h1 class="app-title">VisionAI</h1>
    <p class="app-subtitle">Upload an image to analyze its contents using AI</p>
  </header>

  <main class="app-main">
    <section class="upload-card">
      <!-- components will go here -->
    </section>
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
  background: var(--color-background-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
}
</style>
