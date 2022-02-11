import { readonly, ref } from 'vue'
export default () => {
  const copied = ref(false)
  const charSetNumber = '0123456789'
  const charSetNumberEnabled = ref(false)
  const charSetSpecial = '-!#*+-'
  const charSetSpecialEnabled = ref(false)
  const charSetUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charSetUppercaseEnabled = ref(false)
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
    if (charSetSpecialEnabled.value) set.push(charSetSpecial)
    return set.join('')
  })
  const getRandomNumber = (from: number, to: number) => Math.round(generateRandomCryptoNumber() * to) + from
  const getRandomCharacter = () => characters.value[getRandomNumber(0, characters.value.length - 1)]

  const generateRandomPassword = () => {
    copied.value = false
    const charArray = []
    for (let index = 0; index < passwordLength.value; index++)
      charArray.push(getRandomCharacter())

    password.value = charArray.join('')
  }

  const copyToClipboard = () => {
    if (navigator) {
      navigator.clipboard.writeText(password.value)
      copied.value = true
    }
  }

  watch([passwordLength, charSetNumberEnabled, charSetSpecialEnabled, charSetUppercaseEnabled], () => generateRandomPassword())

  return {
    password: readonly(password),
    length: passwordLength,
    characters: readonly(characters),
    numbers: charSetNumberEnabled,
    special: charSetSpecialEnabled,
    uppercase: charSetUppercaseEnabled,
    generate: generateRandomPassword,
    copy: copyToClipboard,
    copied,
  }
}
