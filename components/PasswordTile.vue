<script setup lang="ts">
import PasswordTileCharacter from './PasswordTileCharacter.vue'

interface Props {
  value: string
  label: string
}
const props = defineProps<Props>()
</script>

<template>
  <div class="text-left ">
    <p class="pl-2 pb-1 text-bluish-200 text-sm font-semibold uppercase">
      {{ props.label }}
    </p>
    <div
      :class="value.length > 30 ? 'text-md py-3.5' : value.length > 20 ? 'text-lg' : 'text-xl'"
      class="flex justify-center items-center bg-bluish-800 rounded-md py-3 font-mono px-4 min-h-[3.2rem]"
    >
      <PasswordTileCharacter v-for="(char, index) of props.value" :key="props.value + index" :character="char" />
    </div>
  </div>
</template>
