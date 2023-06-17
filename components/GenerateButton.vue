<script setup lang="ts">
interface Props {
  title: string
  color?: 'green' | 'blue'
}
const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
})
</script>

<template>
  <button
    :class="{
      'bg-green-900 hover:bg-green-950': props.color === 'green',
      'bg-bluish-400 hover:bg-bluish-500': props.color === 'blue',
    }" class="rounded-md  duration-200 transition-colors px-4 py-3"
  >
    {{ props.title }}
  </button>
</template>
