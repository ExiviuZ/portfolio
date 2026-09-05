<!-- app/components/ScrollProgress.vue -->
<script setup lang="ts">
const progress = ref(0)

function update() {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? (doc.scrollTop / max) * 100 : 0
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div
    class="fixed top-0 left-0 z-99 h-0.5 bg-ink"
    :style="{ width: `${progress}%` }"
    aria-hidden="true"
  />
</template>
