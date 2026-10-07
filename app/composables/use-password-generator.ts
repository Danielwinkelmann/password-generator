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
  appleStyle?: Ref<boolean>
}

/**
 * A composable function that generates random passwords.
 * @param options - The options for the password generator.
 * @returns An object with the generated password, its length, the characters used to generate it, and a function to generate a new password.
 */
export function usePasswordGenerator(options: UsePasswordGeneratorOptions) {
  const { useUppercase, useNumbers, useSymbol, autoUpdate, appleStyle } = options

  const charSetUppercaseEnabled = useUppercase || ref(false)
  const charSetNumberEnabled = useNumbers || ref(false)
  const charSetSymbolEnabled = useSymbol || ref(false)
  const autoUpdateEnabled = autoUpdate || ref(true)
  const appleStyleEnabled = appleStyle || ref(false)

  const charSetNumber = '0123456789'
  const charSetSymbol = '@#$%-'
  const charSetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charSetLowercase = 'abcdefghijklmnopqrstuvwxyz'

  // Apple-style syllables; 'l' is left out so it can't be confused with an uppercase 'I'
  const charSetAppleVowels = 'aeiouy'
  const charSetAppleConsonants = 'bcdfghjkmnpqrstvwxz'

  const password = ref('my_password_generator')
  const passwordLength = useLocalStorage('password_length', 8)

  /**
   * Returns a uniformly distributed random integer using the browser's crypto API.
   * Values above the largest multiple of max are rejected to avoid modulo bias.
   * @param max - The exclusive upper bound.
   * @returns A random integer between 0 and max - 1.
   */
  const getRandomInt = (max: number) => {
    const limit = Math.floor(4294967296 / max) * max
    const buffer = new Uint32Array(1)
    do crypto.getRandomValues(buffer)
    while (buffer[0]! >= limit)
    return buffer[0]! % max
  }

  /**
   * Picks a random character from a string.
   * @param set - The characters to pick from.
   * @returns A random character from set.
   */
  const pick = (set: string) => set[getRandomInt(set.length)]!

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
   * Generates a password in the style of Safari's strong passwords, e.g. "hewfaj-nyfdu6-biJdob":
   * three groups of consonant-vowel-consonant-consonant-vowel-consonant, separated by hyphens,
   * with one digit at the start or end of a group and one uppercase letter (~72 bits of entropy).
   * @returns The generated password.
   */
  const generateApplePassword = () => {
    const groups = Array.from({ length: 3 }, () =>
      [...'cvccvc'].map(type => pick(type === 'v' ? charSetAppleVowels : charSetAppleConsonants)))

    const digitGroup = groups[getRandomInt(groups.length)]!
    digitGroup[getRandomInt(2) === 0 ? 0 : digitGroup.length - 1] = pick(charSetNumber)

    const letterPositions = groups.flatMap((group, groupIndex) =>
      group.flatMap((char, charIndex) => /[a-z]/.test(char) ? [[groupIndex, charIndex] as const] : []))
    const [groupIndex, charIndex] = letterPositions[getRandomInt(letterPositions.length)]!
    groups[groupIndex]![charIndex] = groups[groupIndex]![charIndex]!.toUpperCase()

    return groups.map(group => group.join('')).join('-')
  }

  /**
   * Generates a new random password.
   */
  const generateRandomPassword = () => {
    if (appleStyleEnabled.value) {
      password.value = generateApplePassword()
      return
    }

    const charArray = []
    for (let index = 0; index < passwordLength.value; index++)
      charArray.push(pick(characters.value))

    const pw = charArray.join('')
    if (validatePassword(pw))
      password.value = pw
    else generateRandomPassword()
  }

  /**
   * Watches for changes in the password length or enabled character sets and generates a new password if auto-update is enabled.
   */
  watch([passwordLength, charSetNumberEnabled, charSetSymbolEnabled, charSetUppercaseEnabled, appleStyleEnabled], () => {
    if (autoUpdateEnabled.value)
      generateRandomPassword()
  })

  /**
   * Generates the first password once the entrance animation is underway.
   */
  onMounted(() => setTimeout(() => generateRandomPassword(), 300))

  return {
    password: readonly(password),
    length: passwordLength,
    characters: readonly(characters),
    generate: generateRandomPassword,
  }
}
