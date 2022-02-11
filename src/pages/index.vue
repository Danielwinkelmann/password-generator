<template>
  <div class="space-y-2 w-full max-w-xl text-bluish-50 flex flex-col">
    <PasswordTile label="Password" :value="password" />
    <SliderTile v-model="length" :label="'Length: ' + length" :min="5" :max="35" />
    <ToggleTile v-model="numbers" label="Settings" title="Number Characters" />
    <ToggleTile v-model="uppercase" title="Uppercase Characters" />
    <ToggleTile v-model="symbols" title="Special Characters" />
    <ToggleTile v-model="autoUpdate" title="Auto Update" />
    <GenerateButton title="Generate" @click="generate" />
    <GenerateButton :disabled="copied" :title="copied ? 'Copied!' : 'Copy Password'" @click="copyToClipboard" />
  </div>
</template>

<script setup lang="ts">
import { usePasswordGenerator } from '~/composables/usePasswordGenerator'
const { copy } = useClipboard()
const copied = ref(false)

const symbols = ref(false)
const numbers = ref(false)
const uppercase = ref(false)
const autoUpdate = ref(true)
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
