<script setup lang="ts">
const { locale, locales, setLocale, t } = useI18n()

const activeIndex = computed(() => Math.max(0, locales.value.findIndex(item => item.code === locale.value)))
</script>

<template>
  <div class="flex items-center gap-2">
    <Icon name="tabler:language" class="size-5 text-bluish-200" aria-hidden="true" />
    <div
      role="radiogroup"
      :aria-label="t('language')"
      class="relative grid grid-flow-col auto-cols-fr rounded-full bg-bluish-800 p-1"
    >
      <!-- Pill slides under the active language; cells are equal width so 100% = one cell -->
      <span
        aria-hidden="true"
        class="absolute inset-y-1 left-1 rounded-full bg-bluish-400 transition-transform duration-300 ease-spring"
        :style="{
          width: `calc((100% - 0.5rem) / ${locales.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }"
      />
      <button
        v-for="item of locales"
        :key="item.code"
        type="button"
        role="radio"
        :aria-checked="item.code === locale"
        :aria-label="item.name"
        :title="item.name"
        class="relative rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ease-snappy focus:outline-hidden focus-visible:ring-2 focus-visible:ring-bluish-400/60"
        :class="item.code === locale ? 'text-white' : 'text-bluish-200 hover:text-bluish-50'"
        @click="setLocale(item.code)"
      >
        {{ item.code }}
      </button>
    </div>
  </div>
</template>
