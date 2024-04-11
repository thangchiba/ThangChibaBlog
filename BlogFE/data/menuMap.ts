import React from 'react'
import TextToSpeech from '~/components/utils/TextToSpeech'
import RandomGenerator from '~/components/utils/RandomGenerator'
import MorseTranslator from '~/components/utils/MorseTranslator'

interface ComponentEntry {
  name: string
  component: React.ComponentType<any>
  emoji: string
}

interface MenuMap {
  [endpoint: string]: ComponentEntry
}

const menuMap: MenuMap = {
  tts: {
    name: 'Text To Speech',
    component: TextToSpeech,
    emoji: 'loudspeaker',
  },
  'camera-random-generator': {
    name: 'Random Generator',
    component: RandomGenerator,
    emoji: 'camera-with-flash',
  },
  'morse-translator': {
    name: 'Morse Translator',
    component: MorseTranslator,
    emoji: 'radio',
  },
}

export default menuMap
