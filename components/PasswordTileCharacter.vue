<script setup lang="ts">
import type { Ref } from 'vue'

type State = 'none' | 'animate' | 'done'
const props = defineProps<Props>()
const characters = 'abcdefghijklmnopqrstovwxyz0123456789'
const state: Ref<State> = ref('none')
const getRandomNumber = (from: number, to: number) => Math.floor(Math.random() * to) + from
const getRandomDuration = (max: number) => getRandomNumber(20, max)
const getRandomTicks = (ticks: number) => getRandomNumber(5, ticks)
const getRandomCharacter = () => characters[getRandomNumber(0, characters.length - 1)]

const char = ref('')

interface Props {
  character: string
}

function generateTicks() {
  let tick = 0

  const ticks = getRandomTicks(10)

  const random = setInterval(() => {
    char.value = getRandomCharacter()
    ++tick
    if (tick >= ticks) {
      clearInterval(random)
      char.value = props.character
      state.value = 'done'
    }
  },
  getRandomDuration(40))
}

onMounted(() => {
  char.value = getRandomCharacter()
  setTimeout(() => {
    state.value = 'animate'
    generateTicks()
  },
  getRandomDuration(700))
})

const stateClasses = computed(() => {
  switch (state.value) {
    case 'animate':
      return 'blur-[1px] opacity-70'
    case 'done':
      return ''
    default:
      return 'scale-0 ease-out translate-y-12'
  }
})
</script>

<template>
  <p :class="stateClasses">
    {{ char }}
  </p>
</template>
