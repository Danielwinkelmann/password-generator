<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="w-full max-w-xl mx-auto animate-fade-up [animation-delay:400ms]">
    <div class="py-12 flex flex-col items-center gap-6 md:flex-row md:justify-between">
      <LanguageSwitch class="md:order-2" />
      <p class="text-center text-base text-gray-400 md:order-1">
        {{ t("2021-daniel-winkelmann", { year: new Date().getFullYear() }) }}
      </p>
    </div>
  </footer>
</template>
