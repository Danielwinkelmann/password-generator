<template>
  <div>
    <div class="p-4 font-mono space-y-8 bg-bluish-800 text-bluish-50 rounded-lg flex flex-col">
      <h1 class="text-2xl text-bluish-200 font-semibold">
        {{ t('counter-example') }}
      </h1>
      <h2 class="text-7xl font-bold">
        {{ count }}
      </h2>
      <div class="flex space-x-2">
        <button class="bg-bluish-400 hover:bg-bluish-500 duration-150 transition-colors px-3 py-1 rounded-lg text-bluish-50" @click="decrement">
          {{ t('decrement') }}
        </button>
        <button class="bg-bluish-400 hover:bg-bluish-500 duration-150 transition-colors px-3 py-1 rounded-lg text-bluish-50" @click="increment">
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
</script>

<route lang="yaml">
meta:
  layout: default
</route>
