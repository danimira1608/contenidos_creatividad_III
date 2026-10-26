import cornerHeartTop from '../../assets/home/corner-heart-top.png'
import cornerHeartBottom from '../../assets/home/corner-heart-bottom.png'
import './PopupCard.css'

function PopupCard({ children, className = '' }) {
  return (
    <div className={`popup-card ${className}`.trim()}>
      <img className="popup-card__corner popup-card__corner--top-left" src={cornerHeartTop} alt="" />
      <img className="popup-card__corner popup-card__corner--top-right" src={cornerHeartTop} alt="" />
      <img className="popup-card__corner popup-card__corner--bottom-left" src={cornerHeartBottom} alt="" />
      <img className="popup-card__corner popup-card__corner--bottom-right" src={cornerHeartBottom} alt="" />
      {children}
    </div>
  )
}

export default PopupCard
