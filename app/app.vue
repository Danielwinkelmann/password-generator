<script setup lang="ts">
const { locale, t } = useI18n()
useHead({ htmlAttrs: { lang: locale } })
// Localized at runtime; the static English defaults for crawlers live in nuxt.config
useSeoMeta({
  title: () => t('meta-title'),
  description: () => t('meta-description'),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
