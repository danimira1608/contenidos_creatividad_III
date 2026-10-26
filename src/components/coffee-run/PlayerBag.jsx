import './PlayerBag.css'

function PlayerBag({ positionPercent, bagImage, bagFilter, onMoveLeft, onMoveRight, disabled }) {
  return (
    <div className="player-bag">
      <button
        type="button"
        className="player-bag__arrow player-bag__arrow--left"
        onClick={onMoveLeft}
        disabled={disabled}
        aria-label="Mover canasta a la izquierda"
      >
        ‹••••
      </button>

      <img
        className="player-bag__image"
        src={bagImage}
        alt="Tu canasta"
        style={{ left: `${positionPercent}%`, filter: bagFilter }}
      />

      <button
        type="button"
        className="player-bag__arrow player-bag__arrow--right"
        onClick={onMoveRight}
        disabled={disabled}
        aria-label="Mover canasta a la derecha"
      >
        ••••›
      </button>
    </div>
  )
}

export default PlayerBag
