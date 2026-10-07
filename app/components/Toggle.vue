<script setup lang="ts">
interface Props {
  modelValue: boolean
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
const updateValue = () => emits('update:modelValue', !props.modelValue)
</script>

<template>
  <button
    type="button"
    :class="props.modelValue ? 'bg-bluish-400' : 'bg-bluish-700'"
    class="group relative items-center inline-flex shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-snappy duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-bluish-400/60"
    role="switch"
    :aria-checked="props.modelValue"
    @click="updateValue"
  >
    <!-- Thumb springs across and stretches while pressed, like iOS -->
    <span
      aria-hidden="true"
      :class="props.modelValue ? 'translate-x-5 group-active:translate-x-3' : 'translate-x-0'"
      class="pointer-events-none inline-block h-4 w-4 ml-1 rounded-full bg-white shadow-sm transition-[translate,width] ease-spring duration-300 group-active:w-6"
    />
  </button>
</template>
