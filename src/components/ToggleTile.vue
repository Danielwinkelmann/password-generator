<template>
  <div class="text-left">
    <p v-if="props.label" class="pl-2 pb-1 text-sm font-semibold uppercase">
      {{ props.label }}
    </p>
    <div class="flex justify-between items-center bg-bluish-800 rounded-md py-3 text-sm px-4">
      <p class="pr-2">
        {{ props.title }}
      </p>
      <Toggle :model-value="props.modelValue" @update:model-value="updateValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  title: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
const updateValue = (value: boolean) => emits('update:modelValue', value)
</script>
