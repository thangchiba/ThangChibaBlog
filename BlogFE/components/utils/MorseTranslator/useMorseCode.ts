import { useEffect, useState } from 'react'

const useMorseCode = () => {
  const [wpm, setWpm] = useState(25)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    setAudioContext(new AudioContext())
  }, [])

  const playMorseAudio = (morseString: string) => {
    if (!audioContext) return

    let currentTime = audioContext.currentTime
    const config = {
      wpm,
      frequency: 600,
      waveType: 'triangle' as 'sine' | 'square' | 'sawtooth' | 'triangle',
      get dotLength() {
        return 1.2 / this.wpm
      },
    }

    const morseTiming = {
      '.': { length: 1, sound: 1 },
      '-': { length: 3, sound: 1 },
      ' ': { length: 7, sound: 0 },
    }

    const playBeep = (duration: number, startTime: number) => {
      const oscillator = audioContext.createOscillator()
      oscillator.type = config.waveType
      oscillator.frequency.setValueAtTime(config.frequency, startTime)

      const gainNode = audioContext.createGain()
      gainNode.gain.setValueAtTime(1, startTime)
      gainNode.gain.setValueAtTime(0, startTime + duration)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    }

    for (const char of morseString) {
      const timing = morseTiming[char]
      console.log(`Char: ${char}, Timing: ${timing.length}, Sound: ${timing.sound}`)

      if (timing) {
        const duration = config.dotLength * timing.length
        console.log(`Playing ${char} for duration: ${duration}`)

        if (timing.sound > 0) {
          playBeep(duration, currentTime)
        }
        currentTime += duration
        // Add the space after each Morse code symbol (inter-element space)
        currentTime += config.dotLength
      }
    }
  }

  return { wpm, setWpm, playMorseAudio }
}

export default useMorseCode
