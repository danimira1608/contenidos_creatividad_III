import { useEffect, useState } from 'react'
import { playSound } from '../../utils/sounds'
import './TopControls.css'

// Hides the browser's bars so the arcade cabinet can use the whole screen.
function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement))

  useEffect(() => {
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  // Some browsers (e.g. iPhone Safari) don't support the Fullscreen API.
  if (!document.documentElement.requestFullscreen) return null

  const toggle = () => {
    playSound('click')
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }

  return (
    <button type="button" className="top-control-button" onClick={toggle}>
      {isFullscreen ? 'SALIR DE PANTALLA COMPLETA' : '⛶ PANTALLA COMPLETA'}
    </button>
  )
}

export default FullscreenButton
