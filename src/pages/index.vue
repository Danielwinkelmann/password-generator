<template>
  <div>
    <div class="p-4 space-y-2 bg-bluish-900 text-bluish-50 rounded-lg flex flex-col">
      <h1 class="text-2xl text-bluish-200 font-semibold">
        {{ t('counter-example') }}
      </h1>
      <h2 class="text-7xl font-bold">
        {{ count }}
      </h2>
      <PasswordTile label="PasswordTile" value="cDSVKctQx71hCKnu" />
      <SliderTile v-model="count" label="Slider Tile" :min="5" :max="35" />
      <ToggleTile v-model="toggle" label="Toggle Label" title="Toggle Tile" />
      <ToggleTile v-model="toggle" title="Toggle Tile 1" />
      <ToggleTile v-model="toggle" title="Toggle Tile 2" />
      <GenerateButton @click="toggle ? increment() : decrement()" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterComposable } from '~/composables/useCounterComposable'

const { count, increment, decrement } = useCounterComposable()

const { t } = useI18n()

const toggle = ref(false)
</script>

<route lang="yaml">
meta:
  layout: default
</route>
