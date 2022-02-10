export const useCounterComposable = () => {
  const count = ref(0)

  const double = computed(() => count.value * 2)

  const increment = () => count.value++
  const decrement = () => count.value--

  return {
    count,
    double: readonly(double),
    increment,
    decrement,
  }
}
