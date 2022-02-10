<template>
  <nav class="mt-5 mx-auto space-x-2 flex text-center opacity-25 text-xl">
    <select v-model="locale" @change="setLocale(($event.target! as any).value )">
      <option v-for="item of availableLocales" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </nav>
</template>

<script setup lang="ts">
const { availableLocales, locale } = useI18n()

onMounted(() => {
  const lang = navigator.language
  const storage = window.localStorage.getItem('locale')
  if (!storage) {
    window.localStorage.setItem('locale', lang)
    locale.value = lang
  }
  else {
    if (storage === lang)
      locale.value = lang
    else
      locale.value = storage
  }
})
const setLocale = (value: string) => {
  window.localStorage.setItem('locale', value)
  locale.value = value
}

</script>
