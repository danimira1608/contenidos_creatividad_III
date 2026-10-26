import PixelButton from '../common/PixelButton'
import PopupCard from './PopupCard'
import heartIcon from '../../assets/como-jugar/heart-icon.png'
import sparkle from '../../assets/home/sparkle.png'
import skullIcon from '../../assets/coffee-run/skull-icon.png'
import './GameOverOverlay.css'

function GameOverOverlay({ reason = 'lives', finalScore, canRetry, attemptsRemaining, onRetry, onGoHome, progress }) {
  const title = reason === 'time' ? 'SE ACABÓ EL TIEMPO' : 'GAME OVER'
  const reasonText =
    reason === 'time' ? 'No llegaste a tiempo con todos los esenciales.' : 'Te quedaste sin vidas.'

  return (
    <div className="game-over">
      <PopupCard className="game-over__card">
        <img
          className="game-over__sparkle game-over__sparkle--a decorative-sparkle"
          src={sparkle}
          alt=""
          style={{ animationDuration: '2.2s' }}
        />
        <img
          className="game-over__sparkle game-over__sparkle--b decorative-sparkle"
          src={sparkle}
          alt=""
          style={{ animationDuration: '2.6s', animationDelay: '0.4s' }}
        />
        <img className="game-over__skull" src={skullIcon} alt="" />

        <p className="game-over__title">{title}</p>

        <div className="game-over__divider">
          <span className="game-over__divider-line" />
          <span className="game-over__divider-x">✕</span>
          <span className="game-over__divider-line" />
        </div>

        <p className="game-over__desc">
          {reasonText}
          <br />
          {canRetry
            ? `Te quedan ${attemptsRemaining} ${attemptsRemaining === 1 ? 'intento' : 'intentos'} en este nivel.`
            : 'Ya usaste tus intentos en este nivel.'}
        </p>

        <div className="game-over__score-box">
          <span className="game-over__score-label">
            <img className="game-over__score-heart" src={heartIcon} alt="" />
            PUNTAJE TOTAL
          </span>
          <span className="game-over__score-value">{finalScore}</span>
        </div>

        <div className="game-over__actions">
          <button
            type="button"
            className={canRetry ? 'game-over__home' : 'game-over__home game-over__home--primary'}
            onClick={onGoHome}
          >
            {canRetry ? 'VOLVER A EMPEZAR' : 'VER RANKING'}
          </button>

          {canRetry && (
            <PixelButton className="game-over__retry" onClick={onRetry}>
              REINTENTAR
            </PixelButton>
          )}
        </div>
      </PopupCard>

      <div className="game-over__progress-track">
        <div className="game-over__progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}

export default GameOverOverlay
