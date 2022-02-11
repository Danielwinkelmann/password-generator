<template>
  <footer class="w-full max-w-xl mx-auto">
    <div
      class=" py-12   md:flex md:items-center md:justify-between"
    >
      <div class="flex justify-center space-x-6 md:order-2">
        <select v-model="locale" class="appearance-none block bg-bluish-700 w-full bg-none  border border-bluish-500 rounded-md py-2 pl-3 pr-10 text-base text-bluish-50 focus:outline-none focus:ring-bluish-700 focus:border-bluish-700 sm:text-sm" @change="setLocale(($event.target! as any).value )">
          <option v-for="item of availableLocales" :key="item" :value="item">
            {{ language(item) }}
          </option>
        </select>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <p
          class="text-center text-base text-gray-400"
        >
          {{ t('2021-daniel-winkelmann') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { availableLocales, locale, t } = useI18n()
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

const language = (key: string) => {
  switch (key) {
    case 'de':
      return t('german')
    case 'en':
      return t('english')
    case 'fr':
      return t('french')
    case 'es':
      return t('spanish')
    default:
      return t('unknown')
  }
}

</script>
