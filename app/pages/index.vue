<!-- app/pages/index.vue -->
<script setup lang="ts">
const { activeSection } = useScrollSpy(['hero', 'about', 'skills', 'projects', 'contact'])
</script>

<template>
  <div class="min-h-screen bg-[--color-bg-primary] font-[--font-sans]">
    <AppNav :active-section="activeSection" />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
