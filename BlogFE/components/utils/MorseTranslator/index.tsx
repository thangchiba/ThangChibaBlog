// components/MorseTranslator.tsx

import React, { useState } from 'react'
import { translateToEnglish, translateToMorse } from './MorseCodeUtils'
import InputWithLabel from '~/components/ui/InputWithLabel'
import MorseSpeedSlider from '~/components/utils/MorseTranslator/MorseSpeedSlider'
import useMorseCode from '~/components/utils/MorseTranslator/useMorseCode'

const MorseTranslator: React.FC = () => {
  const [text, setText] = useState('')
  const [morse, setMorse] = useState('')
  const [audioContext] = useState(() => new AudioContext())
  const { wpm, setWpm, playMorseAudio } = useMorseCode()

  const handleTextChange = (value: string) => {
    setText(value.toUpperCase())
    setMorse(translateToMorse(value))
  }

  const handleMorseChange = (value: string) => {
    const normalizedMorse = value
      .replaceAll('−', '.')
      .replaceAll('•', '.')
      .replaceAll('。', '.')
      .replaceAll('・', '.')
      .replaceAll('ー', '-')
      .replaceAll('　', ' ')

    setMorse(normalizedMorse)
    setText(translateToEnglish(normalizedMorse))
  }

  return (
    <div className="p-4 border-2 rounded-xl border-violet-400">
      <InputWithLabel
        label="Text"
        labelWidth={70}
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text"
      />
      <div className="my-4" />
      <InputWithLabel
        label="Morse"
        labelWidth={70}
        value={morse}
        onChange={handleMorseChange}
        placeholder="Enter Morse code"
      />

      <div className="my-2 space-y-4">
        <MorseSpeedSlider wpm={wpm} onWpmChange={setWpm} />
        <button
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => playMorseAudio(morse)}
        >
          Play
        </button>
      </div>
    </div>
  )
}

export default MorseTranslator
