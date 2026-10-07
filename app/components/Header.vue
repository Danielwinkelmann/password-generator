<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="w-full animate-fade-up">
    <nav class="mt-5 mx-auto flex justify-start space-x-2 items-center max-w-xl py-4">
      <Icon name="tabler:lock-password" class="size-8 text-bluish-200" aria-hidden="true" />
      <p class="text-bluish-200 text-2xl font-bold">
        {{ t('password-generator') }}
      </p>
    </nav>
  </div>
</template>
