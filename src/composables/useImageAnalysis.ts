import { ref } from 'vue'

export interface Prediction {
  label: string
  confidence: number
}

export interface ClassifyResponse {
  predictions: Prediction[]
  top_label: string
  top_confidence: number
  needs_review: boolean
}

const API_URL = import.meta.env.VITE_BACKEND_API_URL ?? 'http://backend:8000'

export function useImageAnalysis() {
  const result = ref<ClassifyResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function analyze(file: File) {
    isLoading.value = true
    error.value = null
    result.value = null

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(`${API_URL}/api/v1/classify/`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`)
      }

      const data: ClassifyResponse = await response.json()
      result.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Analysis failed'
    } finally {
      isLoading.value = false
    }
  }

  function reset() {
    result.value = null
    error.value = null
  }

  return { result, isLoading, error, analyze, reset }
}
