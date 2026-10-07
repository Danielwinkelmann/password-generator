<script setup lang="ts">
const { t } = useI18n()
const { $pwa } = useNuxtApp()

// Safari has no install API, so iOS gets a short "Share → Add to Home Screen" guide instead.
// iPadOS reports itself as a Mac, hence the touch check.
const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent)
  || (navigator.userAgent.includes('Macintosh') && navigator.maxTouchPoints > 1)
const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  || (navigator as Navigator & { standalone?: boolean }).standalone === true

// Chrome, Edge and Android fire beforeinstallprompt, which the PWA module captures
const canPrompt = computed(() => !!$pwa?.showInstallPrompt)
const visible = computed(() => !isStandalone && !$pwa?.isPWAInstalled && (canPrompt.value || isIos))

const showGuide = ref(false)
onKeyStroke('Escape', () => showGuide.value = false)

function install() {
  if (canPrompt.value)
    $pwa?.install()
  else
    showGuide.value = true
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-snappy"
    enter-from-class="opacity-0 translate-y-1"
  >
    <button
      v-if="visible"
      type="button"
      class="flex items-center gap-2 rounded-full bg-bluish-800 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-bluish-50 transition-[background-color,scale] duration-200 ease-snappy hover:bg-bluish-700 active:scale-95"
      @click="install"
    >
      <Icon name="tabler:device-mobile-down" class="size-4 text-bluish-400" aria-hidden="true" />
      {{ t('install-app') }}
    </button>
  </Transition>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-snappy"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="showGuide" class="fixed inset-0 z-40 bg-black/60" @click="showGuide = false" />
    </Transition>

    <!-- Bottom sheet, sliding up towards Safari's toolbar where the share button lives -->
    <Transition
      enter-active-class="transition-transform duration-400 ease-snappy"
      enter-from-class="translate-y-full"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="showGuide"
        role="dialog"
        aria-modal="true"
        :aria-label="t('install-guide-title')"
        class="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-xl rounded-t-2xl bg-bluish-800 px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-bluish-50 shadow-2xl"
      >
        <div class="mb-5 flex items-center justify-between">
          <p class="text-lg font-bold">
            {{ t('install-guide-title') }}
          </p>
          <button
            type="button"
            class="grid size-8 place-items-center rounded-full bg-bluish-700 text-bluish-50 transition-colors hover:bg-bluish-500"
            :aria-label="t('close')"
            @click="showGuide = false"
          >
            <Icon name="tabler:x" class="size-4" />
          </button>
        </div>

        <ol class="space-y-3">
          <li class="flex items-center gap-4 rounded-md bg-bluish-900/60 px-4 py-3 animate-fade-up [animation-delay:150ms]">
            <span class="grid size-7 shrink-0 place-items-center rounded-full bg-bluish-400 text-sm font-bold">1</span>
            <span class="flex-1">{{ t('install-guide-share') }}</span>
            <Icon name="tabler:share-2" class="size-6 shrink-0 text-bluish-400" aria-hidden="true" />
          </li>
          <li class="flex items-center gap-4 rounded-md bg-bluish-900/60 px-4 py-3 animate-fade-up [animation-delay:220ms]">
            <span class="grid size-7 shrink-0 place-items-center rounded-full bg-bluish-400 text-sm font-bold">2</span>
            <span class="flex-1">{{ t('install-guide-add') }}</span>
            <Icon name="tabler:square-plus" class="size-6 shrink-0 text-bluish-400" aria-hidden="true" />
          </li>
        </ol>
      </div>
    </Transition>
  </Teleport>
</template>
