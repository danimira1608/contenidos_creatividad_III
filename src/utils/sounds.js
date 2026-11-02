// Tiny 8-bit style sound effects synthesized with the Web Audio API, so the
// game doesn't need any audio files. Each sound is a list of notes:
// [frequency in Hz, start offset in s, duration in s].
const SOUNDS = {
  click: { wave: 'square', volume: 0.08, notes: [[880, 0, 0.05]] },
  select: { wave: 'square', volume: 0.06, notes: [[660, 0, 0.04], [990, 0.04, 0.05]] },
  move: { wave: 'triangle', volume: 0.07, notes: [[520, 0, 0.03]] },
  tick: { wave: 'square', volume: 0.07, notes: [[600, 0, 0.09]] },
  go: { wave: 'square', volume: 0.08, notes: [[900, 0, 0.08], [1200, 0.08, 0.16]] },
  catch: { wave: 'square', volume: 0.07, notes: [[988, 0, 0.06], [1319, 0.06, 0.1]] },
  bonus: {
    wave: 'square',
    volume: 0.07,
    notes: [[1047, 0, 0.06], [1319, 0.06, 0.06], [1568, 0.12, 0.06], [2093, 0.18, 0.14]],
  },
  life: { wave: 'triangle', volume: 0.12, notes: [[784, 0, 0.08], [1047, 0.08, 0.08], [1568, 0.16, 0.16]] },
  hurt: { wave: 'sawtooth', volume: 0.08, notes: [[220, 0, 0.1], [147, 0.1, 0.2]] },
  levelUp: {
    wave: 'square',
    volume: 0.07,
    notes: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.1], [1047, 0.3, 0.12], [784, 0.42, 0.08], [1047, 0.5, 0.3]],
  },
  gameOver: {
    wave: 'triangle',
    volume: 0.14,
    notes: [[523, 0, 0.18], [440, 0.18, 0.18], [349, 0.36, 0.18], [262, 0.54, 0.45]],
  },
}

let audioContext = null

function getAudioContext() {
  if (audioContext) return audioContext
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  audioContext = new AudioContextClass()
  return audioContext
}

export function playSound(name) {
  const sound = SOUNDS[name]
  const context = getAudioContext()
  if (!sound || !context) return
  // Browsers keep audio suspended until the first user interaction.
  if (context.state === 'suspended') context.resume()

  const now = context.currentTime
  for (const [frequency, offset, duration] of sound.notes) {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = sound.wave
    oscillator.frequency.setValueAtTime(frequency, now + offset)
    // Quick fade in/out avoids clicks at the start and end of each note.
    gain.gain.setValueAtTime(0, now + offset)
    gain.gain.linearRampToValueAtTime(sound.volume, now + offset + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + duration)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start(now + offset)
    oscillator.stop(now + offset + duration + 0.02)
  }
}
