<template>
  <div>
    <div class="p-4 space-y-2 bg-bluish-900 text-bluish-50 rounded-lg flex flex-col">
      <h1 class="text-2xl text-bluish-200 font-semibold">
        {{ t('counter-example') }}
      </h1>
      <h2 class="text-7xl font-bold">
        {{ count }}
      </h2>
      <Toggle v-model="toggle" />
      <SliderTile v-model="count" label="Slider Tile" :min="5" :max="35" />
      <ToggleTile v-model="toggle" label="Toggle Label" title="Toggle Tile" />
      <ToggleTile v-model="toggle" title="Toggle Tile 1" />
      <ToggleTile v-model="toggle" title="Toggle Tile 2" />
      <div class="flex space-x-2">
        <button
          class="bg-bluish-400 hover:bg-bluish-500 duration-150 transition-colors px-3 py-1 rounded-md text-bluish-50"
          @click="decrement"
        >
          {{ t('decrement') }}
        </button>
        <button
          class="bg-bluish-400 hover:bg-bluish-500 duration-150 transition-colors px-3 py-1 rounded-md text-bluish-50"
          @click="increment"
        >
          {{ t('increment') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterComposable } from '~/composables/useCounterComposable'

const { count, decrement, increment } = useCounterComposable()

const { t } = useI18n()

const toggle = ref(false)
</script>

<route lang="yaml">
meta:
  layout: default
</route>
