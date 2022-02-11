<template>
  <div class="space-y-2 w-full max-w-xl text-bluish-50 flex flex-col">
    <PasswordTile :label="t('password')" :value="password" />
    <SliderTile v-model="length" :label="t('length-length', [length])" :min="5" :max="35" />
    <ToggleTile v-model="numbers" :label="t('settings')" :title="t('number-characters')" />
    <ToggleTile v-model="uppercase" :title="t('uppercase-characters')" />
    <ToggleTile v-model="symbols" :title="t('special-characters')" />
    <ToggleTile v-model="autoUpdate" :title="t('auto-update')" />
    <GenerateButton :title="t('generate')" @click="generate" />
    <GenerateButton
      :disabled="copied"
      :title="copied ? t('copied') : t('copy-password')"
      @click="copyToClipboard"
    />
  </div>
</template>

<script setup lang="ts">
import { usePasswordGenerator } from '~/composables/usePasswordGenerator'
const { t } = useI18n()
const { copy } = useClipboard()
const copied = ref(false)

const symbols = useLocalStorage('password_symbols', false)
const numbers = useLocalStorage('password_numbers', false)
const uppercase = useLocalStorage('password_uppercase', false)
const autoUpdate = useLocalStorage('password_auto_update', true)
const { password, length, generate } = usePasswordGenerator({ useNumbers: numbers, useSymbol: symbols, useUppercase: uppercase, autoUpdate })
watch(password, () => copied.value = false)
async function copyToClipboard() {
  await copy(password.value)
  copied.value = true
}
</script>

<route lang="yaml">
meta:
  layout: default
</route>
