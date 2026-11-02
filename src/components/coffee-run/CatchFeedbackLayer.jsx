import heartIcon from '../../assets/como-jugar/heart-icon.png'
import skullIcon from '../../assets/coffee-run/skull-icon.png'
import sparkle from '../../assets/home/sparkle.png'
import './CatchFeedbackLayer.css'

const TONE_ICONS = {
  gain: heartIcon,
  loss: skullIcon,
  bonus: sparkle,
}

// Short-lived notices ("+10 LLAVES", "-1 VIDA"…) that pop up over the bag
// after each catch, so the player can follow what just happened.
function CatchFeedbackLayer({ items }) {
  return (
    <div className="catch-feedback" aria-live="polite">
      {items.map((item) => (
        <div
          key={item.id}
          className={`catch-feedback__card catch-feedback__card--${item.tone}`}
          style={{ left: `${item.xPercent}%` }}
        >
          <img className="catch-feedback__icon" src={TONE_ICONS[item.tone]} alt="" />
          <div className="catch-feedback__text">
            {item.amount && <span className="catch-feedback__amount">{item.amount}</span>}
            {item.label && <span className="catch-feedback__label">{item.label}</span>}
          </div>
          <img className="catch-feedback__icon" src={TONE_ICONS[item.tone]} alt="" />
        </div>
      ))}
    </div>
  )
}

export default CatchFeedbackLayer
