import type { Ref } from 'vue'
import { readonly, ref } from 'vue'
export interface UsePasswordGeneratorOptions {
  autoUpdate?: Ref<boolean>
  useUppercase?: Ref<boolean>
  useSymbol?: Ref<boolean>
  useNumbers?: Ref<boolean>
}
export function usePasswordGenerator(options: UsePasswordGeneratorOptions) {
  const { useUppercase, useNumbers, useSymbol, autoUpdate } = options
  const charSetUppercaseEnabled = useUppercase || ref(false)
  const charSetNumberEnabled = useNumbers || ref(false)
  const charSetSymbolEnabled = useSymbol || ref(false)
  const autoUpdateEnabled = autoUpdate || ref(true)
  const charSetNumber = '0123456789'
  const charSetSymbol = '@#$%'
  const charSetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charSetLowercase = 'abcdefghijklmnopqrstovwxyz'
  const password = ref('password')
  const passwordLength = ref(8)

  const generateRandomCryptoNumber = () => {
    if (window)
      return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296
    else
      return Math.random() // to avoid SSR Issues
  }

  const characters = computed(() => {
    const set = [charSetLowercase]
    if (charSetNumberEnabled.value) set.push(charSetNumber)
    if (charSetUppercaseEnabled.value) set.push(charSetUppercase)
    if (charSetSymbolEnabled.value) set.push(charSetSymbol)
    return set.join('')
  })
  const getRandomNumber = (from: number, to: number) => Math.round(generateRandomCryptoNumber() * to) + from
  const getRandomCharacter = () => characters.value[getRandomNumber(0, characters.value.length - 1)]

  const generateRandomPassword = () => {
    const charArray = []
    for (let index = 0; index < passwordLength.value; index++)
      charArray.push(getRandomCharacter())

    password.value = charArray.join('')
  }
  watch([passwordLength, charSetNumberEnabled, charSetSymbolEnabled, charSetUppercaseEnabled], () => {
    if (autoUpdateEnabled.value)
      generateRandomPassword()
  })

  return {
    password: readonly(password),
    length: passwordLength,
    characters: readonly(characters),
    generate: generateRandomPassword,
  }
}
