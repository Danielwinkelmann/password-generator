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
  const charSetSymbol = '@#$%-'
  const charSetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charSetLowercase = 'abcdefghijklmnopqrstovwxyz'
  const password = ref('my_password_generator')
  const passwordLength = useLocalStorage('password_length', 8)

  const generateRandomCryptoNumber = () => {
    if (window)
      return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296
    else
      return Math.random() // to avoid SSR Issues
  }

  const validatePassword = (password: string) => {
    const lowerRegExp = new RegExp(`[${charSetLowercase}]`, 'gm')
    const upperRegExp = new RegExp(`[${charSetUppercase}]`, 'gm')
    const symbolRegExp = new RegExp(`[${charSetSymbol}]`, 'gm')
    const numberRegExp = new RegExp(`[${charSetNumber}]`, 'gm')
    if (!password.match(lowerRegExp))
      return false
    if (charSetNumberEnabled.value && !password.match(numberRegExp))
      return false
    if (charSetUppercaseEnabled.value && !password.match(upperRegExp))
      return false
    if (charSetSymbolEnabled.value && !password.match(symbolRegExp))
      return false
    return true
  }

  const characters = computed(() => {
    const set = [charSetLowercase]
    if (charSetNumberEnabled.value)
      set.push(charSetNumber)
    if (charSetUppercaseEnabled.value)
      set.push(charSetUppercase)
    if (charSetSymbolEnabled.value)
      set.push(charSetSymbol)
    return set.join('')
  })
  const getRandomNumber = (from: number, to: number) => Math.round(generateRandomCryptoNumber() * to) + from
  const getRandomCharacter = () => characters.value[getRandomNumber(0, characters.value.length - 1)]

  const generateRandomPassword = () => {
    const charArray = []
    for (let index = 0; index < passwordLength.value; index++)
      charArray.push(getRandomCharacter())
    const pw = charArray.join('')
    if (validatePassword(pw))
      password.value = pw
    else generateRandomPassword()
  }
  watch([passwordLength, charSetNumberEnabled, charSetSymbolEnabled, charSetUppercaseEnabled], () => {
    if (autoUpdateEnabled.value)
      generateRandomPassword()
  })

  onMounted(() => setTimeout(() => generateRandomPassword(), 2500))

  return {
    password: readonly(password),
    length: passwordLength,
    characters: readonly(characters),
    generate: generateRandomPassword,
  }
}
