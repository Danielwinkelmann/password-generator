<template>
  <div>
    <div class="p-2 w-full min-w-full max-w-3xl space-y-2 bg-bluish-900 text-bluish-50 rounded-lg flex flex-col">
      <button @click="copy">
        <PasswordTile label="Password" :value="password" />
      </button>
      <SliderTile v-model="length" :label="'Length: ' + length" :min="5" :max="35" />
      <ToggleTile v-model="numbers" label="Settings" title="Number Characters" />
      <ToggleTile v-model="uppercase" title="Uppercase Characters" />
      <ToggleTile v-model="special" title="Special Characters" />
      <GenerateButton @click="generate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import usePasswordGenerator from '~/composables/usePasswordGenerator'
const { password, length, generate, numbers, special, uppercase, copy } = usePasswordGenerator()
</script>

<route lang="yaml">
meta:
  layout: default
</route>
