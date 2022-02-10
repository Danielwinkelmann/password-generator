<template>
  <div>
    <div class="p-4 font-mono space-y-8 bg-slate-100 rounded-lg flex flex-col">
      <h1 class="text-2xl font-semibold">
        {{ t('counter-example') }}
      </h1>
      <h2 class="text-7xl font-bold">
        {{ count }}
      </h2>
      <div class="flex space-x-2">
        <button class="bg-teal-600 hover:bg-teal-700 duration-150 transition-colors px-3 py-1 rounded-lg text-slate-100" @click="decrement">
          {{ t('decrement') }}
        </button>
        <button class="bg-teal-600 hover:bg-teal-700 duration-150 transition-colors px-3 py-1 rounded-lg text-slate-100" @click="increment">
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
