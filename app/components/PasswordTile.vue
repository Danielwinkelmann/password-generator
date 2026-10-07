<script setup lang="ts">
import PasswordTileCharacter from './PasswordTileCharacter.vue'

interface Props {
  value: string
  label: string
  copyCount?: number
}
const props = defineProps<Props>()

const tile = useTemplateRef<HTMLElement>('tile')
const reducedMotion = usePreferredReducedMotion()

// Delay between neighbouring characters in the copy wave
const waveStep = 22

// Copy wave: each character flips to '*' in turn, and once the wave has run
// through the whole password they flip back in the same order
const masked = ref<boolean[]>([])
let maskTimers: ReturnType<typeof setTimeout>[] = []
function clearMask() {
  maskTimers.forEach(clearTimeout)
  maskTimers = []
  masked.value = []
}
function runMaskWave() {
  clearMask()
  const hold = props.value.length * waveStep + 150
  for (let index = 0; index < props.value.length; index++) {
    maskTimers.push(
      setTimeout(() => masked.value[index] = true, index * waveStep),
      setTimeout(() => masked.value[index] = false, index * waveStep + hold),
    )
  }
}
watch(() => props.value, clearMask)
onBeforeUnmount(clearMask)

// On copy: the mask wave plus a green lift running through the characters while the tile glows
watch(() => props.copyCount, () => {
  runMaskWave()

  if (!tile.value || reducedMotion.value === 'reduce')
    return

  tile.value.animate(
    [
      { boxShadow: '0 0 0 0 rgb(52 211 153 / 0)' },
      { boxShadow: '0 0 0 2px rgb(52 211 153 / 0.7), 0 0 28px rgb(52 211 153 / 0.25)', offset: 0.25 },
      { boxShadow: '0 0 0 0 rgb(52 211 153 / 0)' },
    ],
    { duration: 1100, easing: 'cubic-bezier(0.2, 0, 0, 1)' },
  )

  Array.from(tile.value.children).forEach((char, index) => {
    char.animate(
      [
        { translate: '0 0', color: '#DEE6FF' },
        { translate: '0 -6px', color: '#34D399', offset: 0.4 },
        { translate: '0 0', color: '#DEE6FF' },
      ],
      { duration: 450, delay: index * waveStep, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    )
  })
})
</script>

<template>
  <div class="text-left ">
    <p class="pl-2 pb-1 text-bluish-200 text-sm font-semibold uppercase">
      {{ props.label }}
    </p>
    <div
      ref="tile"
      :class="value.length > 30 ? 'text-base py-3.5' : value.length > 20 ? 'text-lg' : 'text-xl'"
      class="flex justify-center items-center bg-bluish-800 rounded-md py-3 font-mono px-4 min-h-[3.2rem]"
    >
      <PasswordTileCharacter
        v-for="(char, index) of props.value"
        :key="props.value + index"
        :character="char"
        :masked="masked[index]"
      />
    </div>
  </div>
</template>
