import PixelButton from '../common/PixelButton'
import './PauseOverlay.css'

function PauseOverlay({ onResume }) {
  return (
    <div className="pause-overlay">
      <div className="pause-overlay__card">
        <p className="pause-overlay__title">PAUSADO</p>
      </div>

      <PixelButton className="pause-overlay__cta" onClick={onResume}>
        REANUDAR
      </PixelButton>
    </div>
  )
}

export default PauseOverlay
