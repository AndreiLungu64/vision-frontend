<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  fileSelected: [file: File]
}>()

const isDragging = ref(false)
const previewUrl = ref<string | null>(null)
const fileName = ref<string | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

function handleFile(file: File) {
  if (!file.type.startsWith('image/')) return
  fileName.value = file.name
  previewUrl.value = URL.createObjectURL(file)
  emit('fileSelected', file)
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file) handleFile(file)
}

function onDragOver() {
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onFileInput(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) handleFile(file)
}

function openFilePicker() {
  fileInputRef.value?.click()
}

function clear() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = null
  fileName.value = null
  if (fileInputRef.value) fileInputRef.value.value = ''
}

defineExpose({ clear })
</script>

<template>
  <div
    class="dropzone"
    :class="{ dragging: isDragging, 'has-preview': previewUrl }"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @click="openFilePicker"
  >
    <input ref="fileInputRef" type="file" accept="image/*" hidden @change="onFileInput" />

    <template v-if="previewUrl">
      <img :src="previewUrl" :alt="fileName ?? 'Preview'" class="preview" />
      <p class="file-name">{{ fileName }}</p>
    </template>

    <template v-else>
      <div class="upload-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <p class="upload-text">Drag and drop an image here</p>
      <p class="upload-hint">or click to browse</p>
    </template>
  </div>
</template>

<style scoped>
.dropzone {
  border: 2px dashed var(--color-border-dashed);
  border-radius: var(--radius-md);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s;
  min-height: 200px;
}

.dropzone:hover,
.dropzone.dragging {
  border-color: var(--color-accent);
  background-color: rgba(11, 132, 246, 0.04);
}

.dropzone.has-preview {
  padding: 1.5rem;
}

.upload-icon {
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.upload-text {
  color: var(--color-text-primary);
  font-size: 0.95rem;
  font-weight: 500;
}

.upload-hint {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.preview {
  max-width: 100%;
  max-height: 260px;
  border-radius: var(--radius-sm);
  object-fit: contain;
}

.file-name {
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  margin-top: 0.75rem;
  word-break: break-all;
  text-align: center;
}
</style>
