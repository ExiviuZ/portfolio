<!-- app/pages/index.vue -->
<script setup lang="ts">
const { activeSection } = useScrollSpy(['hero', 'about', 'skills', 'learning', 'projects', 'contact'])
</script>

<template>
  <div class="min-h-screen bg-[--color-bg-primary]">
    <AppNav :active-section="activeSection" />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <LearningSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
