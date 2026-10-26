import PixelButton from '../common/PixelButton'
import './ComoJugarFooter.css'

function ComoJugarFooter({ buttonLabel, onNext, isPressed }) {
  return (
    <footer className="como-jugar-footer">
      <PixelButton className="como-jugar-footer__cta" onClick={onNext} pressed={isPressed}>
        {buttonLabel}
      </PixelButton>
    </footer>
  )
}

export default ComoJugarFooter
