<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

interface Props {
  modelValue: boolean
  label?: string
  title: string
  icon?: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()
const updateValue = (value: boolean) => emits('update:modelValue', value)

const iconRef = useTemplateRef<ComponentPublicInstance>('icon')
const reducedMotion = usePreferredReducedMotion()

// Small pop + wiggle when the option gets switched on
watch(() => props.modelValue, (enabled) => {
  if (!enabled || reducedMotion.value === 'reduce')
    return
  iconRef.value?.$el?.animate?.(
    [
      { scale: 1, rotate: '0deg' },
      { scale: 1.35, rotate: '-12deg', offset: 0.4 },
      { scale: 1, rotate: '0deg' },
    ],
    { duration: 450, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  )
})
</script>

<template>
  <div class="text-left">
    <p v-if="props.label" class="pl-2 pb-1 text-bluish-200 text-sm font-semibold uppercase">
      {{ props.label }}
    </p>
    <div class="flex justify-between items-center bg-bluish-800 rounded-md py-3 text-sm px-4">
      <p class="flex items-center gap-3 pr-2">
        <Icon
          v-if="props.icon"
          ref="icon"
          :name="props.icon"
          class="size-5 shrink-0 transition-colors duration-200 ease-snappy"
          :class="props.modelValue ? 'text-bluish-400' : 'text-bluish-200'"
        />
        {{ props.title }}
      </p>
      <Toggle :model-value="props.modelValue" @update:model-value="updateValue" />
    </div>
  </div>
</template>
