<script setup lang="ts">
const { t } = useI18n()
const { copy } = useClipboard()
const copied = ref(false)
const copyCount = ref(0)

const symbols = useLocalStorage('password_symbols', false)
const numbers = useLocalStorage('password_numbers', false)
const uppercase = useLocalStorage('password_uppercase', false)
const autoUpdate = useLocalStorage('password_auto_update', true)
const appleStyle = useLocalStorage('password_apple_style', true)
const { password, length, generate } = usePasswordGenerator({ useNumbers: numbers, useSymbol: symbols, useUppercase: uppercase, autoUpdate, appleStyle })
watch(password, () => copied.value = false)

let copiedTimeout: ReturnType<typeof setTimeout> | undefined
async function copyToClipboard() {
  await copy(password.value)
  copied.value = true
  copyCount.value++
  navigator.vibrate?.(15)
  clearTimeout(copiedTimeout)
  copiedTimeout = setTimeout(() => copied.value = false, 2000)
}

// Staggered entrance, ~45ms apart
const enter = (index: number) => ({ animationDelay: `${80 + index * 45}ms` })
</script>

<template>
  <div class="space-y-2 w-full max-w-xl text-bluish-50 flex flex-col">
    <PasswordTile :label="t('password')" :value="password" :copy-count="copyCount" class="animate-fade-up" :style="enter(0)" />

    <!-- Apple-style passwords have a fixed format, so length and character sets don't apply -->
    <Collapse :open="!appleStyle">
      <SliderTile v-model="length" :label="t('length-length', [length])" :min="5" :max="35" class="animate-fade-up" :style="enter(1)" />
    </Collapse>

    <p class="mb-1 pl-2 text-bluish-200 text-sm font-semibold uppercase animate-fade-up" :style="enter(2)">
      {{ t('settings') }}
    </p>
    <Collapse :open="!appleStyle">
      <ToggleTile v-model="numbers" icon="tabler:numbers" :title="t('number-characters')" class="animate-fade-up" :style="enter(3)" />
      <ToggleTile v-model="uppercase" icon="tabler:letter-case-upper" :title="t('uppercase-characters')" class="animate-fade-up" :style="enter(4)" />
      <ToggleTile v-model="symbols" icon="tabler:at" :title="t('special-characters')" class="animate-fade-up" :style="enter(5)" />
    </Collapse>
    <ToggleTile v-model="autoUpdate" icon="tabler:refresh" :title="t('auto-update')" class="animate-fade-up" :style="enter(3)" />
    <ToggleTile v-model="appleStyle" icon="tabler:brand-apple" :title="t('apple-password')" class="animate-fade-up" :style="enter(4)" />

    <GenerateButton icon="tabler:refresh" :title="t('generate')" class="animate-fade-up" :style="enter(5)" @click="generate" />
    <CopyButton
      :copied="copied" :title="t('copy-password')" :copied-title="t('copied')"
      class="animate-fade-up" :style="enter(6)"
      @click="copyToClipboard"
    />
  </div>
</template>
