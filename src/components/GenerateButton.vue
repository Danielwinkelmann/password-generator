<template>
  <button :disabled="disabled" class="rounded-md disabled:bg-green-900 disabled:cursor-not-allowed bg-bluish-400 hover:bg-bluish-500 duration-200 transition-colors px-4 py-3">
    {{ props.title }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  title: string
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>
