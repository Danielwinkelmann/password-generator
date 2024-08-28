import type { Ref } from 'vue'
import { readonly, ref } from 'vue'

/**
 * Options for the password generator.
 */
export interface UsePasswordGeneratorOptions {
  autoUpdate?: Ref<boolean>
  useUppercase?: Ref<boolean>
  useSymbol?: Ref<boolean>
  useNumbers?: Ref<boolean>
}

/**
 * A composable function that generates random passwords.
 * @param options - The options for the password generator.
 * @returns An object with the generated password, its length, the characters used to generate it, and a function to generate a new password.
 */
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

  /**
   * Generates a random number using the browser's crypto API or Math.random().
   * @returns A random number between 0 and 1.
   */
  const generateRandomCryptoNumber = () => {
    if (window)
      return crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296
    else
      return Math.random() // to avoid SSR Issues
  }

  /**
   * Validates a password against the enabled character sets.
   * @param password - The password to validate.
   * @returns True if the password is valid, false otherwise.
   */
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

  /**
   * The characters used to generate the password.
   */
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

  /**
   * Generates a random number between two values.
   * @param from - The minimum value.
   * @param to - The maximum value.
   * @returns A random number between from and to.
   */
  const getRandomNumber = (from: number, to: number) => Math.round(generateRandomCryptoNumber() * to) + from

  /**
   * Gets a random character from the character set.
   * @returns A random character from the character set.
   */
  const getRandomCharacter = () => characters.value[getRandomNumber(0, characters.value.length - 1)]

  /**
   * Generates a new random password.
   */
  const generateRandomPassword = () => {
    const charArray = []
    for (let index = 0; index < passwordLength.value; index++)
      charArray.push(getRandomCharacter())

    const pw = charArray.join('')
    if (validatePassword(pw))
      password.value = pw
    else generateRandomPassword()
  }

  /**
   * Watches for changes in the password length or enabled character sets and generates a new password if auto-update is enabled.
   */
  watch([passwordLength, charSetNumberEnabled, charSetSymbolEnabled, charSetUppercaseEnabled], () => {
    if (autoUpdateEnabled.value)
      generateRandomPassword()
  })

  /**
   * Generates a new password after a delay to avoid SSR issues.
   */
  onMounted(() => setTimeout(() => generateRandomPassword(), 2500))

  return {
    password: readonly(password),
    length: passwordLength,
    characters: readonly(characters),
    generate: generateRandomPassword,
  }
}
