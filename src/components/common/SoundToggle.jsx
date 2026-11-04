import { useState } from 'react'
import { isSoundMuted, playSound, setSoundMuted } from '../../utils/sounds'
import './TopControls.css'

function SoundToggle() {
  const [isMuted, setIsMuted] = useState(isSoundMuted)

  const toggle = () => {
    const nextMuted = !isMuted
    setSoundMuted(nextMuted)
    setIsMuted(nextMuted)
    // A little blip confirms the sound is back on.
    if (!nextMuted) playSound('click')
  }

  return (
    <button type="button" className="top-control-button" onClick={toggle} aria-pressed={isMuted}>
      {isMuted ? '🔇 SIN SONIDO' : '🔊 SONIDO'}
    </button>
  )
}

export default SoundToggle
