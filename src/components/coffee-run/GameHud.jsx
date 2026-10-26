import heartIcon from '../../assets/como-jugar/heart-icon.png'
import './GameHud.css'

function GameHud({ level, levelName, score, time, lives, maxLives, isPaused, onTogglePause }) {
  return (
    <div className="game-hud">
      <div className="game-hud__block">
        <p className="game-hud__label game-hud__label--big">{level}</p>
        <p className="game-hud__label">{levelName}</p>
      </div>

      <div className="game-hud__block">
        <p className="game-hud__label">PUNTAJE</p>
        <p className="game-hud__value">{score}</p>
      </div>

      <div className="game-hud__block">
        <p className="game-hud__label">TIEMPO</p>
        <p className="game-hud__value">{time}</p>
      </div>

      <div className="game-hud__block">
        <p className="game-hud__label">VIDAS</p>
        <div className="game-hud__lives">
          {Array.from({ length: maxLives }).map((_, index) => (
            <img
              key={index}
              className="game-hud__heart"
              src={heartIcon}
              alt=""
              style={{ opacity: index < lives ? 1 : 0.25 }}
            />
          ))}
        </div>
      </div>

      <button type="button" className="game-hud__pause" onClick={onTogglePause} aria-label={isPaused ? 'Reanudar' : 'Pausar'}>
        {isPaused ? '▶' : '❚❚'}
      </button>
    </div>
  )
}

export default GameHud
