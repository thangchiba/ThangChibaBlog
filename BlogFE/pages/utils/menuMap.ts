import React from 'react'
import TextToSpeech from '~/components/utils/TextToSpeech'
import RandomGenerator from '~/components/utils/RandomGenerator'

interface ComponentEntry {
  name: string
  component: React.ComponentType
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
}

export default menuMap
