// Morse code representation
const morseCode = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  ' ': ' / ',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
}

// Reverse the Morse code dictionary for English translation
export const englishCode = Object.fromEntries(
  Object.entries(morseCode).map(([english, morse]) => [morse, english])
)

export const translateToMorse = (text: string) => {
  return text
    .toUpperCase()
    .split('')
    .map((char) => morseCode[char] || '')
    .join(' ')
}

export const translateToEnglish = (morse: string) => {
  return morse
    .split(' ')
    .map((code) => englishCode[code] || '')
    .join('')
}
