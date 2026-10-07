<template>
  <!-- Safe-area padding keeps content clear of the notch and home indicator (viewport-fit=cover) -->
  <main class="min-h-dvh px-[max(1rem,env(safe-area-inset-left))] pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] bg-bluish-900 flex flex-col items-center justify-between">
    <Header />
    <slot />
    <Footer />
  </main>
</template>
