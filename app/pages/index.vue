<!-- app/pages/index.vue -->
<script setup lang="ts">
const { activeSection } = useScrollSpy(['hero', 'about', 'experience', 'skills', 'learning', 'projects', 'contact'])
</script>

<template>
  <div class="min-h-screen bg-[--color-bg-primary]">
    <AppNav :active-section="activeSection" />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <LearningSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
