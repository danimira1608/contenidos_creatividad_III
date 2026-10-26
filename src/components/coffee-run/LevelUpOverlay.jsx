import PixelButton from '../common/PixelButton'
import PopupCard from './PopupCard'
import heartIcon from '../../assets/como-jugar/heart-icon.png'
import sparkle from '../../assets/home/sparkle.png'
import bagProductsIcon from '../../assets/coffee-run/next-level.png'
import './LevelUpOverlay.css'

function LevelUpOverlay({ nextLevelLabel, playerName, score, timeBonus, onContinue, progress, ctaLabel = 'SIGUIENTE NIVEL' }) {
  return (
    <div className="level-up">
      <PopupCard className="level-up__card">
        <p className="level-up__level-tag">
          <img className="level-up__level-tag-heart" src={heartIcon} alt="" />
          {nextLevelLabel}
          <img className="level-up__level-tag-heart" src={heartIcon} alt="" />
        </p>

        <div className="level-up__title-row">
          <img
            className="level-up__sparkle decorative-sparkle"
            src={sparkle}
            alt=""
            style={{ animationDuration: '2.2s' }}
          />
          <p className="level-up__title">LEVEL UP!</p>
          <img
            className="level-up__sparkle decorative-sparkle"
            src={sparkle}
            alt=""
            style={{ animationDuration: '2.6s', animationDelay: '0.4s' }}
          />
        </div>

        <img className="level-up__title-heart decorative-pulse" src={heartIcon} alt="" style={{ animationDuration: '1.4s' }} />

        <p className="level-up__congrats">¡FELICITACIONES{playerName ? `, ${playerName}` : ''}!</p>
        <p className="level-up__desc">
          Pasaste de nivel con
          <br />
          <span className="level-up__desc-highlight">{score}</span> puntos.
        </p>
        {timeBonus > 0 && (
          <p className="level-up__time-bonus">
            Ya sumaste {timeBonus} de esos puntos por el tiempo que te sobró
          </p>
        )}

        <div className="level-up__bag-wrap">
          <img
            className="level-up__bag-heart level-up__bag-heart--a decorative-pulse"
            src={heartIcon}
            alt=""
            style={{ animationDuration: '1.5s' }}
          />
          <img
            className="level-up__bag-heart level-up__bag-heart--b decorative-pulse"
            src={heartIcon}
            alt=""
            style={{ animationDuration: '1.7s', animationDelay: '0.3s' }}
          />
          <img className="level-up__bag" src={bagProductsIcon} alt="La cartera llena de productos rhode" />
        </div>

        <PixelButton className="level-up__cta" onClick={onContinue}>
          {ctaLabel}
        </PixelButton>
      </PopupCard>

      <div className="level-up__progress-track">
        <div className="level-up__progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}

export default LevelUpOverlay
