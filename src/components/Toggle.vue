<template>
  <button
    type="button"
    :class="props.modelValue ? 'bg-bluish-400' : 'bg-bluish-200'"
    class=" relative items-center inline-flex flex-shrink-0 h-6 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
    role="switch"
    aria-checked="false"
    @click="updateValue"
  >
    <span
      aria-hidden="true"
      :class="props.modelValue ? 'translate-x-5' : 'translate-x-0'"
      class=" pointer-events-none inline-block h-4 w-4 ml-1  rounded-full bg-white  transform ring-0 transition ease-in-out duration-200"
    />
  </button>
</template>

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
