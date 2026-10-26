import PixelButton from '../common/PixelButton'
import './ChooseBagFooter.css'

function ChooseBagFooter({ buttonLabel, onContinue, isPressed }) {
  return (
    <footer className="choose-bag-footer">
      <PixelButton className="choose-bag-footer__cta" onClick={onContinue} pressed={isPressed}>
        {buttonLabel}
      </PixelButton>
    </footer>
  )
}

export default ChooseBagFooter
