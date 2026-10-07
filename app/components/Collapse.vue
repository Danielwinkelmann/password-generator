<script setup lang="ts">
interface Props {
  open: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <!-- Animates height via grid rows; the bottom padding replaces the parent's space-y gap so a closed panel takes no space -->
  <div
    class="grid mb-0 transition-[grid-template-rows,opacity,translate] duration-300 ease-snappy"
    :class="props.open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 -translate-y-1'"
    :inert="!props.open"
  >
    <div class="min-h-0 overflow-hidden">
      <div class="space-y-2 pb-2">
        <slot />
      </div>
    </div>
  </div>
</template>
