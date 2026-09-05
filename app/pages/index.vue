<!-- app/pages/index.vue -->
<script setup lang="ts">
const { activeSection } = useScrollSpy(['hero', 'about', 'experience', 'skills', 'learning', 'projects', 'contact'])
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-paper">
    <ScrollProgress />
    <AppNav :active-section="activeSection" />
    <main id="top">
      <HeroSection />
      <SkillTicker />
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
