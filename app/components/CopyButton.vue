<script setup lang="ts">
interface Props {
  copied: boolean
  title: string
  copiedTitle: string
}
const props = defineProps<Props>()

// A new burst id remounts the particles so their animation replays on every copy
const burst = ref(0)
watch(() => props.copied, (copied) => {
  if (copied)
    burst.value++
})

const colors = ['#34D399', '#6EE7B7', '#DEE6FF', '#157AF5']
const particles = Array.from({ length: 12 }, (_, index) => ({
  angle: `${index * 30 + (index % 2 ? 10 : -10)}deg`,
  distance: `${26 + (index % 3) * 9}px`,
  size: index % 3 === 0 ? 6 : 4,
  color: colors[index % colors.length],
  delay: `${(index % 4) * 15}ms`,
}))
</script>

<template>
  <button
    type="button"
    class="flex items-center justify-center gap-2 rounded-md px-4 py-3 transition-[background-color,scale] duration-300 ease-snappy active:scale-[0.97]"
    :class="props.copied ? 'bg-emerald-600' : 'bg-bluish-400 hover:bg-bluish-500'"
  >
    <span class="relative grid size-5 place-items-center">
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300 ease-spring"
        enter-from-class="scale-30 -rotate-45 opacity-0"
        leave-active-class="transition duration-100 ease-in"
        leave-to-class="scale-50 opacity-0"
      >
        <Icon v-if="props.copied" key="check" name="tabler:check" class="icon-draw size-5" />
        <Icon v-else key="copy" name="tabler:copy" class="size-5" />
      </Transition>

      <span v-if="burst" :key="burst" aria-hidden="true" class="pointer-events-none absolute inset-0">
        <span class="absolute inset-0 rounded-full border-2 border-emerald-300 animate-ring" />
        <span
          v-for="(particle, index) of particles"
          :key="index"
          class="absolute left-1/2 top-1/2 rounded-full animate-burst"
          :style="{
            '--angle': particle.angle,
            '--distance': particle.distance,
            'width': `${particle.size}px`,
            'height': `${particle.size}px`,
            'backgroundColor': particle.color,
            'animationDelay': particle.delay,
          }"
        />
      </span>
    </span>

    <!-- Both labels share one grid cell so the button content doesn't jump while they swap -->
    <span class="grid overflow-hidden">
      <Transition
        enter-active-class="transition duration-300 ease-spring"
        enter-from-class="translate-y-full opacity-0"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="-translate-y-full opacity-0"
      >
        <span :key="String(props.copied)" class="[grid-area:1/1]">
          {{ props.copied ? props.copiedTitle : props.title }}
        </span>
      </Transition>
    </span>
  </button>
</template>
