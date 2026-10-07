<script setup lang="ts">
interface Props {
  title: string
  icon?: string
}
const props = defineProps<Props>()

// Each click spins the icon one more turn
const rotation = ref(0)
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center gap-2 rounded-md bg-bluish-400 px-4 py-3 transition-[background-color,scale] duration-200 ease-snappy hover:bg-bluish-500 active:scale-[0.97]"
    @click="rotation += 360"
  >
    <Icon
      v-if="props.icon"
      :name="props.icon"
      class="size-5 transition-[rotate] duration-700 ease-spring"
      :style="{ rotate: `${rotation}deg` }"
    />
    {{ props.title }}
  </button>
</template>
