import React from 'react'
import TextToSpeech from '~/components/utils/TextToSpeech'
import RandomGenerator from '~/components/utils/RandomGenerator'
import MorseTranslator from '~/components/utils/MorseTranslator'
import UploadFile from '~/components/utils/UploadFile'
import HandwritingCanvas from '~/components/utils/HandwritingCanvas'
import HandWriteRecognition from '~/components/utils/HandWrite/HandWriteRecognition'
import WebhookMonitor from '~/components/utils/WebhookMonitor'

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
    emoji: 'ferris-wheel',
  },
  'upload-file': {
    name: 'Upload File',
    component: UploadFile,
    emoji: 'airplane-departure',
  },
  handwrite: {
    name: 'Hand Write',
    component: HandWriteRecognition,
    emoji: 'handwrite',
  },
  'webhook-monitor': {
    name: 'Webhook Monitor',
    component: WebhookMonitor,
    emoji: 'hook',
  },
}

export default menuMap
