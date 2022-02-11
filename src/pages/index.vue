<template>
  <div class="space-y-2 w-full max-w-xl text-bluish-50 flex flex-col">
    <PasswordTile label="Password" :value="password" />
    <SliderTile v-model="length" :label="'Length: ' + length" :min="5" :max="35" />
    <ToggleTile v-model="numbers" label="Settings" title="Number Characters" />
    <ToggleTile v-model="uppercase" title="Uppercase Characters" />
    <ToggleTile v-model="special" title="Special Characters" />
    <GenerateButton @click="generate" />
  </div>
</template>

<script setup lang="ts">
import usePasswordGenerator from '~/composables/usePasswordGenerator'
const { password, length, generate, numbers, special, uppercase } = usePasswordGenerator()
</script>

<route lang="yaml">
meta:
  layout: default
</route>
